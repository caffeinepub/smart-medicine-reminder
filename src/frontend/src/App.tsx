import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Bell,
  Eye,
  EyeOff,
  KeyRound,
  LayoutDashboard,
  Loader2,
  Pill,
  Search,
  UserCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import ReportChapter4 from "./ReportChapter4";
import ProfileTab from "./components/ProfileTab";
import { useAuth } from "./hooks/useAuth";
import { useProfile, useUpdateProfile } from "./hooks/useProfile";
import { useReminderNotifications } from "./hooks/useReminderNotifications";
import { useReminders } from "./hooks/useReminders";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import MedicineSearch from "./pages/MedicineSearch";
import Reminders from "./pages/Reminders";

type Tab = "dashboard" | "reminders" | "search" | "history" | "profile";

function AuthScreen() {
  const {
    loginWithPassword,
    registerWithPassword,
    loginWithII,
    isLoggingInWithII,
  } = useAuth();

  const [tab, setTab] = useState<"signin" | "register">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [locality, setLocality] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Password visibility toggles
  const [showSignInPwd, setShowSignInPwd] = useState(false);
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    const result = await loginWithPassword(username, password);
    setIsLoading(false);
    if (result.error) {
      if (result.error === "Username not found") {
        setError(
          "No account found with that username. Create one in the 'Create Account' tab.",
        );
      } else {
        setError(result.error);
      }
    }
  };

  const handleRegister = async () => {
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }
    if (age.trim()) {
      const n = Number(age);
      if (Number.isNaN(n) || n < 0 || n > 120) {
        setError("Age must be between 0 and 120");
        return;
      }
    }
    setIsLoading(true);
    const result = await registerWithPassword(username, password);
    setIsLoading(false);
    if (result.error) {
      if (result.error === "Username already taken") {
        setError(
          "Username already taken. If this is your account, try signing in instead.",
        );
      } else {
        setError(result.error);
      }
    } else {
      if (fullName.trim())
        sessionStorage.setItem("reg_fullname", fullName.trim());
      if (email.trim()) sessionStorage.setItem("reg_email", email.trim());
      if (age.trim()) sessionStorage.setItem("reg_age", age.trim());
      if (gender.trim()) sessionStorage.setItem("reg_gender", gender.trim());
      if (locality.trim())
        sessionStorage.setItem("reg_locality", locality.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (tab === "signin") handleSignIn();
      else handleRegister();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-4">
            <Pill className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-1">
            MediRemind
          </h1>
          <p className="text-sm text-muted-foreground">
            Smart medicine reminders
          </p>
        </div>

        {/* Auth card */}
        <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
          <Tabs
            value={tab}
            onValueChange={(v) => {
              setTab(v as "signin" | "register");
              setError(null);
              setPassword("");
              setConfirmPassword("");
              setFullName("");
              setEmail("");
              setAge("");
              setGender("");
              setLocality("");
            }}
          >
            <TabsList className="w-full mb-5">
              <TabsTrigger
                data-ocid="auth.signin.tab"
                value="signin"
                className="flex-1"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                data-ocid="auth.register.tab"
                value="register"
                className="flex-1"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="signin-username">Username</Label>
                <Input
                  id="signin-username"
                  data-ocid="auth.signin.input"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signin-password"
                    data-ocid="auth.password.input"
                    type={showSignInPwd ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    onKeyDown={handleKeyDown}
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignInPwd(!showSignInPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={
                      showSignInPwd ? "Hide password" : "Show password"
                    }
                  >
                    {showSignInPwd ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <div
                  data-ocid="auth.signin.error_state"
                  className="text-xs text-destructive space-y-1"
                >
                  <p>{error}</p>
                  {error.includes("Create Account") && (
                    <button
                      type="button"
                      className="underline font-medium"
                      onClick={() => {
                        setTab("register");
                        setError(null);
                      }}
                    >
                      Go to Create Account →
                    </button>
                  )}
                </div>
              )}
              <Button
                data-ocid="auth.signin.submit_button"
                className="w-full"
                size="lg"
                onClick={handleSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </TabsContent>

            <TabsContent value="register" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="reg-fullname">Full Name</Label>
                <Input
                  id="reg-fullname"
                  data-ocid="auth.register.fullname.input"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  data-ocid="auth.register.email.input"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-age">
                  Age{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="reg-age"
                  data-ocid="auth.register.age.input"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  min={0}
                  max={120}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Gender{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </Label>
                <Select
                  value={gender}
                  onValueChange={(v) => {
                    setGender(v);
                    setError(null);
                  }}
                >
                  <SelectTrigger data-ocid="auth.register.gender.select">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-locality">
                  Locality / City{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="reg-locality"
                  data-ocid="auth.register.locality.input"
                  placeholder="Enter your city or locality"
                  value={locality}
                  onChange={(e) => {
                    setLocality(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-username">Username</Label>
                <Input
                  id="reg-username"
                  data-ocid="auth.register.input"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <div className="relative">
                  <Input
                    id="reg-password"
                    data-ocid="auth.register.password.input"
                    type={showRegPwd ? "text" : "password"}
                    placeholder="Create a password (min 6 chars)"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    onKeyDown={handleKeyDown}
                    autoComplete="new-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPwd(!showRegPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showRegPwd ? "Hide password" : "Show password"}
                  >
                    {showRegPwd ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-confirm">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="reg-confirm"
                    data-ocid="auth.confirm.input"
                    type={showConfirmPwd ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError(null);
                    }}
                    onKeyDown={handleKeyDown}
                    autoComplete="new-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={
                      showConfirmPwd ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPwd ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <div
                  data-ocid="auth.register.error_state"
                  className="text-xs text-destructive space-y-1"
                >
                  <p>{error}</p>
                  {error.includes("signing in") && (
                    <button
                      type="button"
                      className="underline font-medium"
                      onClick={() => {
                        setTab("signin");
                        setError(null);
                      }}
                    >
                      Go to Sign In →
                    </button>
                  )}
                </div>
              )}
              <Button
                data-ocid="auth.register.submit_button"
                className="w-full"
                size="lg"
                onClick={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </TabsContent>
          </Tabs>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* II secondary button */}
          <Button
            data-ocid="auth.ii.button"
            variant="outline"
            className="w-full gap-2"
            onClick={loginWithII}
            disabled={isLoggingInWithII}
          >
            {isLoggingInWithII ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <KeyRound className="w-4 h-4" />
            )}
            {isLoggingInWithII
              ? "Opening Internet Identity..."
              : "Continue with Internet Identity"}
          </Button>
          <p className="text-[11px] text-center text-muted-foreground mt-2">
            Internet Identity works best on the deployed version.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function HeaderAvatar({
  photoUrl,
  username,
  onClick,
}: {
  photoUrl?: string;
  username: string | null;
  onClick: () => void;
}) {
  const initials = username ? username.slice(0, 2).toUpperCase() : "?";

  return (
    <button
      type="button"
      data-ocid="app.profile.open_modal_button"
      onClick={onClick}
      className="focus:outline-none focus:ring-2 focus:ring-ring rounded-full"
      aria-label="Open profile"
    >
      <Avatar className="w-8 h-8 border border-border hover:ring-2 hover:ring-primary/40 transition-all">
        <AvatarImage src={photoUrl} />
        <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>
    </button>
  );
}

function AppInner() {
  const { isAuthenticated, isInitializing, username, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("darkMode") === "true";
    } catch {
      return false;
    }
  });

  const { data: reminders } = useReminders();
  const { notifPermission } = useReminderNotifications(reminders);
  const { data: profile } = useProfile();
  const updateProfile = useUpdateProfile();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("darkMode", String(darkMode));
    } catch {
      /* ignore in iframe contexts */
    }
  }, [darkMode]);

  useEffect(() => {
    const pendingName = sessionStorage.getItem("reg_fullname");
    const pendingAge = sessionStorage.getItem("reg_age");
    const pendingGender = sessionStorage.getItem("reg_gender");
    const pendingLocality = sessionStorage.getItem("reg_locality");
    const hasPending =
      pendingName || pendingAge || pendingGender || pendingLocality;
    if (hasPending && isAuthenticated && profile !== undefined) {
      sessionStorage.removeItem("reg_fullname");
      sessionStorage.removeItem("reg_email");
      sessionStorage.removeItem("reg_age");
      sessionStorage.removeItem("reg_gender");
      sessionStorage.removeItem("reg_locality");
      updateProfile.mutate({
        name: pendingName?.trim() || profile?.name || "",
        age: pendingAge
          ? BigInt(Math.floor(Number(pendingAge)))
          : (profile?.age ?? BigInt(0)),
        gender: pendingGender || profile?.gender || "",
        locality: pendingLocality?.trim() || profile?.locality || "",
        photoUrl: profile?.photoUrl ?? "",
        lastUpdated: BigInt(Date.now()),
      });
    }
  }, [isAuthenticated, profile, updateProfile.mutate]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Pill className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "dashboard",
      label: "Home",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    { id: "reminders", label: "Reminders", icon: <Bell className="w-5 h-5" /> },
    { id: "search", label: "Search", icon: <Search className="w-5 h-5" /> },
    {
      id: "history",
      label: "History",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <UserCircle className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toaster />
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pill className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg text-foreground">MediRemind</span>
          {notifPermission === "granted" && (
            <span
              data-ocid="app.notification.success_state"
              className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full"
              title="Reminder notifications are active"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-ocid="app.toggle"
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <HeaderAvatar
            photoUrl={profile?.photoUrl}
            username={username}
            onClick={() => setActiveTab("profile")}
          />
        </div>
      </header>

      <main className="flex-1 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "reminders" && <Reminders />}
            {activeTab === "search" && <MedicineSearch />}
            {activeTab === "history" && <History />}
            {activeTab === "profile" && <ProfileTab onLogout={logout} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border">
        <div className="max-w-lg mx-auto flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-ocid={`nav.${tab.id}.link`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors relative ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  if (window.location.pathname === "/report") {
    return <ReportChapter4 />;
  }
  return <AppInner />;
}
