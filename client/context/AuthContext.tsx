import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type UserRole = "client" | "advisor" | "admin" | null;

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Exclude<UserRole, null>;
}

interface FreeCallState {
  remaining: number;
  calls: string[]; // timestamps
}

interface AuthContextValue {
  user: UserProfile | null;
  role: UserRole;
  loading: boolean;
  login: (email: string, name: string, role: Exclude<UserRole, null>) => void;
  logout: () => void;
  getFreeCallState: () => FreeCallState | null;
  consumeFreeCall: () => FreeCallState | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "finadvi.auth";
const FREE_CALL_KEY = "finadvi.freecalls";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as UserProfile;
        setUser(parsed);
      }
    } catch (e) {
      console.error("Failed to parse auth storage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const ensureFreeStateFor = useCallback((id: string) => {
    try {
      const raw = localStorage.getItem(FREE_CALL_KEY);
      const map = raw ? JSON.parse(raw) as Record<string, FreeCallState> : {};
      if (!map[id]) {
        map[id] = { remaining: 2, calls: [] };
        localStorage.setItem(FREE_CALL_KEY, JSON.stringify(map));
        return map[id];
      }
      return map[id];
    } catch (e) {
      console.error("Failed to access free call storage", e);
      return null;
    }
  }, []);

  const getFreeCallState = useCallback(() => {
    if (!user) return null;
    try {
      const raw = localStorage.getItem(FREE_CALL_KEY);
      const map = raw ? JSON.parse(raw) as Record<string, FreeCallState> : {};
      return map[user.id] ?? null;
    } catch (e) {
      console.error("Failed to read free call state", e);
      return null;
    }
  }, [user]);

  const consumeFreeCall = useCallback(() => {
    if (!user) return null;
    try {
      const raw = localStorage.getItem(FREE_CALL_KEY);
      const map = raw ? JSON.parse(raw) as Record<string, FreeCallState> : {};
      if (!map[user.id]) {
        map[user.id] = { remaining: 2, calls: [] };
      }
      if (map[user.id].remaining <= 0) return map[user.id];
      map[user.id].remaining -= 1;
      map[user.id].calls.push(new Date().toISOString());
      localStorage.setItem(FREE_CALL_KEY, JSON.stringify(map));
      return map[user.id];
    } catch (e) {
      console.error("Failed to consume free call", e);
      return null;
    }
  }, [user]);

  const login = useCallback((email: string, name: string, role: Exclude<UserRole, null>) => {
    const profile: UserProfile = {
      id: btoa(`${email}-${role}`),
      email,
      name,
      role,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setUser(profile);

    // Initialize free calls for first time logins
    try {
      ensureFreeStateFor(profile.id);
    } catch (e) {
      // ignore
    }
  }, [ensureFreeStateFor]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    role: user?.role ?? null,
    loading,
    login,
    logout,
    getFreeCallState,
    consumeFreeCall,
  }), [user, loading, login, logout, getFreeCallState, consumeFreeCall]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
