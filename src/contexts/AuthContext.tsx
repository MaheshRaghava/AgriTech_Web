import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth, firestore } from '../firebase'; // Make sure this path is correct
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

// Define user types
export type UserRole = 'farmer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userType: UserRole | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserRole | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Try to restore user data from localStorage first
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setUserType(parsedUser.role);
        } else {
          // Fallback: fetch user data from Firestore
          const userDocRef = doc(firestore, 'users', firebaseUser.uid);
          let userDocSnap = await getDoc(userDocRef);
          if (!userDocSnap.exists()) {
            // Auto-create missing user doc
            await setDoc(userDocRef, {
              uid: firebaseUser.uid,
              name: firebaseUser.email?.split('@')[0] || '',
              email: firebaseUser.email,
              role: 'farmer',
              createdAt: serverTimestamp(),
            });
            userDocSnap = await getDoc(userDocRef);
          }
          const userData = userDocSnap.data();
          const fetchedUser: User = {
            id: firebaseUser.uid,
            name: userData.name || firebaseUser.email?.split('@')[0] || '',
            email: firebaseUser.email || '',
            role: userData.role || 'farmer',
          };
          setUser(fetchedUser);
          setUserType(fetchedUser.role);
          localStorage.setItem('user', JSON.stringify(fetchedUser));
        }
      } else {
        setUser(null);
        setUserType(null);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Fetch user role and name from Firestore
      const userDocRef = doc(firestore, 'users', firebaseUser.uid);
      let userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Auto-create user doc if missing (for legacy users)
        await setDoc(userDocRef, {
          uid: firebaseUser.uid,
          name: firebaseUser.email?.split('@')[0] || '',
          email: firebaseUser.email,
          role: 'farmer',
          createdAt: serverTimestamp(),
        });
        userDocSnap = await getDoc(userDocRef);
      }

      const userData = userDocSnap.data();

      const loggedInUser: User = {
        id: firebaseUser.uid,
        name: userData.name || firebaseUser.email?.split('@')[0] || '',
        email: firebaseUser.email || '',
        role: userData.role || 'farmer',
      };

      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setUserType(loggedInUser.role);

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // Do not auto-login after registration; sign out immediately
  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      await setDoc(doc(firestore, 'users', firebaseUser.uid), {
        uid: firebaseUser.uid,
        name: name,
        email: firebaseUser.email,
        role: role,
        createdAt: serverTimestamp(),
      });

      await signOut(auth);

      return true;
    } catch (error: any) {
      console.error('Registration failed:', error);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email already registered');
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      setUser(null);
      setUserType(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        userType,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};