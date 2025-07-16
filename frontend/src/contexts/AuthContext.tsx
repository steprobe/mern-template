import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { apiClient } from '../api/client';

interface UserData {
  id: string;
  firebaseId: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatar?: string;
  isSuperUser: boolean;
  hasDevToolsAccess: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean | null;
  user: UserData | null;
  loading: boolean;
  firebaseUser: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        const isVerified = firebaseUser?.emailVerified ?? false;
        setFirebaseUser(firebaseUser);
        setIsAuthenticated(isVerified);

        if (isVerified) {
          // Fetch user data from backend
          try {
            const userData = await apiClient.get<UserData>('/user');
            setUser(userData);
          } catch (error) {
            console.error('Failed to fetch user data:', error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setIsAuthenticated(false);
        setUser(null);
        setFirebaseUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    isAuthenticated,
    user,
    loading,
    firebaseUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
