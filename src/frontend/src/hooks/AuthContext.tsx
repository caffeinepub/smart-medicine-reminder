import type { Identity } from "@icp-sdk/core/agent";
import { Ed25519KeyIdentity } from "@icp-sdk/core/identity";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useInternetIdentity } from "./useInternetIdentity";

type AuthMethod = "password" | "ii" | null;

export type AuthState = {
  isAuthenticated: boolean;
  isInitializing: boolean;
  username: string | null;
  method: AuthMethod;
  /** Stable IC identity for password-based auth users */
  passwordIdentity: Identity | null;
  loginWithPassword: (
    username: string,
    password: string,
  ) => Promise<{ error?: string }>;
  registerWithPassword: (
    username: string,
    password: string,
  ) => Promise<{ error?: string }>;
  loginWithII: () => void;
  isLoggingInWithII: boolean;
  logout: () => void;
};

type StoredUser = { username: string; passwordHash: string };
type Session = { username: string; method: "password" | "ii" };

const USERS_KEY = "mediremind_users";
const SESSION_KEY = "mediremind_session";

function hashPassword(username: string, password: string): string {
  return btoa(`${username}:${password}`);
}

/** Derive a stable 32-byte seed from username + password using PBKDF2 */
async function deriveIdentitySeed(
  username: string,
  password: string,
): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode(`mediremind:${username.toLowerCase()}`),
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );
  return new Uint8Array(bits);
}

/** Generate a stable Ed25519 identity from username + password */
async function deriveIdentity(
  username: string,
  password: string,
): Promise<Ed25519KeyIdentity> {
  const seed = await deriveIdentitySeed(username, password);
  return Ed25519KeyIdentity.generate(seed);
}

let memUsers: StoredUser[] = [];
let memSession: Session | null = null;

function isStorageAvailable(type: "localStorage" | "sessionStorage"): boolean {
  try {
    const s = window[type];
    const testKey = "__storage_test__";
    s.setItem(testKey, "1");
    s.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function getUsers(): StoredUser[] {
  if (isStorageAvailable("localStorage")) {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
    } catch {
      return memUsers;
    }
  }
  return memUsers;
}

function saveUsers(users: StoredUser[]): void {
  memUsers = users;
  if (isStorageAvailable("localStorage")) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch {
      /* fallback */
    }
  }
}

function getSession(): Session | null {
  if (isStorageAvailable("sessionStorage")) {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : memSession;
    } catch {
      return memSession;
    }
  }
  return memSession;
}

function saveSession(session: Session): void {
  memSession = session;
  if (isStorageAvailable("sessionStorage")) {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      /* fallback */
    }
  }
}

function clearSession(): void {
  memSession = null;
  if (isStorageAvailable("sessionStorage")) {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  }
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const ii = useInternetIdentity();
  const [session, setSession] = useState<Session | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [passwordIdentity, setPasswordIdentity] = useState<Identity | null>(
    null,
  );

  useEffect(() => {
    const stored = getSession();
    if (stored) setSession(stored);
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    if (ii.isLoginSuccess && ii.identity) {
      const principal = ii.identity.getPrincipal().toString();
      const newSession: Session = { username: principal, method: "ii" };
      saveSession(newSession);
      setSession(newSession);
    }
  }, [ii.isLoginSuccess, ii.identity]);

  const loginWithPassword = useCallback(
    async (username: string, password: string): Promise<{ error?: string }> => {
      const trimmed = username.trim();
      if (!trimmed || !password) return { error: "Please fill in all fields" };
      const users = getUsers();
      const user = users.find(
        (u) => u.username.toLowerCase() === trimmed.toLowerCase(),
      );
      if (!user) return { error: "Username not found" };
      const hash = hashPassword(trimmed.toLowerCase(), password);
      if (user.passwordHash !== hash) return { error: "Incorrect password" };
      const newSession: Session = {
        username: user.username,
        method: "password",
      };
      saveSession(newSession);
      setSession(newSession);
      // Derive stable IC identity for this user
      const identity = await deriveIdentity(trimmed.toLowerCase(), password);
      setPasswordIdentity(identity);
      return {};
    },
    [],
  );

  const registerWithPassword = useCallback(
    async (username: string, password: string): Promise<{ error?: string }> => {
      const trimmed = username.trim();
      if (!trimmed || !password) return { error: "Please fill in all fields" };
      if (trimmed.length < 3)
        return { error: "Username must be at least 3 characters" };
      if (password.length < 6)
        return { error: "Password must be at least 6 characters" };
      const users = getUsers();
      if (
        users.some((u) => u.username.toLowerCase() === trimmed.toLowerCase())
      ) {
        return { error: "Username already taken" };
      }
      const hash = hashPassword(trimmed.toLowerCase(), password);
      users.push({ username: trimmed, passwordHash: hash });
      saveUsers(users);
      const newSession: Session = { username: trimmed, method: "password" };
      saveSession(newSession);
      setSession(newSession);
      // Derive stable IC identity for this new user
      const identity = await deriveIdentity(trimmed.toLowerCase(), password);
      setPasswordIdentity(identity);
      return {};
    },
    [],
  );

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
    setPasswordIdentity(null);
    if (session?.method === "ii") ii.clear();
  }, [session, ii]);

  const value = useMemo<AuthState>(
    () => ({
      isAuthenticated: !!session,
      isInitializing: isInitializing || ii.isInitializing,
      username: session?.username ?? null,
      method: session?.method ?? null,
      passwordIdentity,
      loginWithPassword,
      registerWithPassword,
      loginWithII: ii.login,
      isLoggingInWithII: ii.isLoggingIn,
      logout,
    }),
    [
      session,
      isInitializing,
      ii,
      passwordIdentity,
      loginWithPassword,
      registerWithPassword,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
