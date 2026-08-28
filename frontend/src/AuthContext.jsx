import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

function maskMobile(raw) {
  const digits = raw.replace(/[^\d]/g, '');
  if (digits.length <= 4) return digits;
  const start = digits.slice(0, 3);
  const end = digits.slice(-3);
  return `${start}****${end}`;
}

function truncateEmail(email) {
  if (email.length <= 12) return email;
  return `${email.slice(0, 9)}...`;
}

function displayAccount(account) {
  if (!account) return '';
  if (account.includes('@')) return truncateEmail(account);
  return maskMobile(account);
}

function readJSON(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJSON('user', null));
  const [resume, setResume] = useState(() => readJSON('resume', null));

  const login = useCallback((account, options = {}) => {
    const nextUser = {
      account,
      display: options.display || displayAccount(account) || account,
      ...(options.provider ? { provider: options.provider } : {}),
      ...(options.name ? { name: options.name } : {}),
    };
    setUser(nextUser);
    localStorage.setItem('user', JSON.stringify(nextUser));
    return nextUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const saveResume = useCallback((data) => {
    setResume(data);
    localStorage.setItem('resume', JSON.stringify(data));
  }, []);

  return (
    <AuthContext.Provider value={{ user, resume, login, logout, saveResume }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
