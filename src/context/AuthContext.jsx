import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { STUDENTS } from '../data/students';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userKey, setUserKey] = useState(null);

  const login = useCallback((key) => setUserKey(key), []);
  const logout = useCallback(() => setUserKey(null), []);
  const switchProfile = useCallback((key) => setUserKey(key), []);

  const student = userKey ? STUDENTS[userKey] : null;

  const value = useMemo(
    () => ({ userKey, student, isAuthenticated: !!userKey, login, logout, switchProfile }),
    [userKey, student, login, logout, switchProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
