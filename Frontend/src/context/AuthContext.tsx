import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

const API = 'http://localhost:8080/api';

interface AuthUser {
  token: string;
  userId: string;
  name: string;
  role: string;
}

interface AdminAuth {
  token: string;
  adminId: string;
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  admin: AdminAuth | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  adminLogin: (name: string, password: string) => Promise<boolean>;
  logout: () => void;
  adminLogout: () => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('freshcart_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [admin, setAdmin] = useState<AdminAuth | null>(() => {
    const stored = localStorage.getItem('freshcart_admin');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('freshcart_user', JSON.stringify(user));
    else localStorage.removeItem('freshcart_user');
  }, [user]);

  useEffect(() => {
    if (admin) localStorage.setItem('freshcart_admin', JSON.stringify(admin));
    else localStorage.removeItem('freshcart_admin');
  }, [admin]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      setUser(data);
      return true;
    } catch { return false; }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'REGULAR' }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      setUser(data);
      return true;
    } catch { return false; }
  };

  const adminLogin = async (name: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: name, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      setAdmin(data);
      return true;
    } catch { return false; }
  };

  const logout = () => setUser(null);
  const adminLogout = () => setAdmin(null);

  return (
    <AuthContext.Provider value={{
      user, admin, login, register, adminLogin, logout, adminLogout,
      isLoggedIn: !!user, isAdmin: !!admin,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
