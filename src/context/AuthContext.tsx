import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

type User = {
  id: string;
  email: string;
  name?: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const rawUser = data.session?.user;
      if (rawUser?.email) {
        setUser({ 
          id: rawUser.id, 
          email: rawUser.email,
          name: rawUser.user_metadata?.name || rawUser.user_metadata?.full_name
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const rawUser = session?.user;
      if (rawUser?.email) {
        setUser({ 
          id: rawUser.id, 
          email: rawUser.email,
          name: rawUser.user_metadata?.name || rawUser.user_metadata?.full_name
        });
      } else {
        setUser(null);
      }
    });

    getSession();
    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const refreshUser = async () => {
    const { data } = await supabase.auth.getSession();
    const rawUser = data.session?.user;
    if (rawUser?.email) {
      setUser({ 
        id: rawUser.id, 
        email: rawUser.email,
        name: rawUser.user_metadata?.name || rawUser.user_metadata?.full_name
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
