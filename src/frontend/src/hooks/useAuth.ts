import { useCallback, useEffect, useMemo, useState } from "react";
import { useInternetIdentity } from "./useInternetIdentity";

type AuthMethod = "password" | "ii" | null;

export type AuthState = {
  isAuthenticated: boolean;
  isInitializing: boolean;
  username: string | null;
  method: AuthMethod;
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

// In-memory fallback when storage APIs are blocked (e.g. cross-origin iframes)
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
      /* silently fall back to memory */
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
      /* silently fall back to memory */
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

export function useAuth(): AuthState {
  const ii = useInternetIdentity();
  const [session, setSession] = useState<Session | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const stored = getSession();
    if (stored) {
      setSession(stored);
    }
    setIsInitializing(false);
  }, []);

  // When II login succeeds, create a session
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
      return {};
    },
    [],
  );

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
    if (session?.method === "ii") {
      ii.clear();
    }
  }, [session, ii]);

  return useMemo<AuthState>(
    () => ({
      isAuthenticated: !!session,
      isInitializing: isInitializing || ii.isInitializing,
      username: session?.username ?? null,
      method: session?.method ?? null,
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
      loginWithPassword,
      registerWithPassword,
      logout,
    ],
  );
}
