
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { users } from '@/lib/data';
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Current user storage in localStorage
const getCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
};

const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

const getUserByEmailAndPassword = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isManager: boolean;
  isKaryawan: boolean;
  isPemimpin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load user from localStorage on initial render
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock login that would be replaced by a real authentication system
    try {
      const user = getUserByEmailAndPassword(email, password);
      
      if (user) {
        setUser(user);
        setCurrentUser(user);
        toast({
          title: "Login Berhasil",
          description: `Selamat datang, ${user.name}!`,
        });
        return true;
      } else {
        toast({
          title: "Login Gagal",
          description: "Email atau password salah",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat login",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
    toast({
      title: "Logout Berhasil",
      description: "Anda telah berhasil keluar dari sistem",
    });
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';
  const isKaryawan = user?.role === 'karyawan';
  const isPemimpin = user?.role === 'pemimpin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated,
      isAdmin,
      isManager,
      isKaryawan,
      isPemimpin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
