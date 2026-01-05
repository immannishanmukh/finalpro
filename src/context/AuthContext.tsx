import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (email: string, password: string, role: UserRole, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole) => {
    const mockUser: User = {
      id: '1',
      email,
      role,
      name: role === 'mentor' ? 'John Mentor' : 'Jane Student',
      mentorSince: role === 'mentor' ? '2022' : undefined,
      rating: role === 'mentor' ? 4.8 : undefined,
    };
    setUser(mockUser);
  };

  const signup = async (email: string, password: string, role: UserRole, name: string) => {
    const mockUser: User = {
      id: '1',
      email,
      role,
      name,
      mentorSince: role === 'mentor' ? new Date().getFullYear().toString() : undefined,
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
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
