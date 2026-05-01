import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

export type Role = 'Admin' | 'Moderator' | 'Staff';

export interface UserAccount {
  id: string;
  username: string;
  role: Role;
}

interface AuthContextType {
  currentUser: UserAccount | null;
  accounts: UserAccount[];
  login: (username: string, passwordHash: string) => boolean;
  logout: () => void;
  createAccount: (username: string, passwordHash: string, role: Role) => boolean;
  deleteAccount: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real app we'd hash passwords. Here we'll just store plain for demo purpose to keep it simple,
// but we'll use a prefix or direct comparison.
const INITIAL_ACCOUNTS = [
  { id: '1', username: 'Cyrus', role: 'Admin' as Role, password: 'admin123' }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('siha_accounts');
      return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
    } catch {
      return INITIAL_ACCOUNTS;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    localStorage.setItem('siha_accounts', JSON.stringify(accounts));
  }, [accounts]);

  const login = (username: string, passwordHash: string) => {
    const user = accounts.find(a => a.username === username && a.password === passwordHash);
    if (user) {
      setCurrentUser({ id: user.id, username: user.username, role: user.role });
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const createAccount = (username: string, passwordHash: string, role: Role) => {
    if (accounts.some(a => a.username === username)) return false;
    
    const newAccount = {
      id: Date.now().toString(),
      username,
      password: passwordHash,
      role
    };
    
    setAccounts([...accounts, newAccount]);
    return true;
  };

  const deleteAccount = (id: string) => {
    if (id === '1') return; // protect default admin
    setAccounts(accounts.filter(a => a.id !== id));
  };

  return (
    <AuthContext.Provider value={{ currentUser, accounts, login, logout, createAccount, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
