import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for offline/demo mode
const DEMO_USER: User = {
  id: 'demo-user-001',
  email: 'helderkock2008@gmail.com',
  name: 'Gestor',
  role: 'admin',
  company_id: 'c1',
  avatar_url: '',
};

const DEMO_EMAIL = 'helderkock2008@gmail.com';
const DEMO_PASSWORD = 'fouetgestta@1';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('fouet_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('fouet_user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Try Supabase auth first
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (supabaseUrl) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) {
          const appUser: User = {
            id: data.user.id,
            email: data.user.email || email,
            name: data.user.user_metadata?.name || 'Gestor',
            role: 'admin',
            company_id: 'c1',
            avatar_url: data.user.user_metadata?.avatar_url,
          };
          setUser(appUser);
          localStorage.setItem('fouet_user', JSON.stringify(appUser));
          localStorage.setItem('access_token', data.session?.access_token || '');
          return;
        }
      }
      // Fallback: demo mode
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        setUser(DEMO_USER);
        localStorage.setItem('fouet_user', JSON.stringify(DEMO_USER));
        localStorage.setItem('access_token', 'demo-token');
        return;
      }
      throw new Error('E-mail ou senha incorretos');
    } catch (err) {
      // If Supabase is not configured, use demo mode
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        setUser(DEMO_USER);
        localStorage.setItem('fouet_user', JSON.stringify(DEMO_USER));
        localStorage.setItem('access_token', 'demo-token');
        return;
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch { /* ignore */ }
    setUser(null);
    localStorage.removeItem('fouet_user');
    localStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
