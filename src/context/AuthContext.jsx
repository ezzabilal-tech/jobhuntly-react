import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('jobhuntly_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('jobhuntly_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password, role = 'seeker') => {
    // Mock login verification: any email and password of min length 4 works
    if (email && password && password.length >= 4) {
      const mockUser = {
        name: email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' '),
        email,
        role,
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100`,
      };
      localStorage.setItem('jobhuntly_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password (min 4 characters)' };
  };

  const signup = (name, email, password, role = 'seeker') => {
    if (name && email && password && password.length >= 4) {
      const mockUser = {
        name,
        email,
        role,
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100`,
      };
      localStorage.setItem('jobhuntly_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true };
    }
    return { success: false, error: 'Please fill all fields and use min 4 characters for password.' };
  };

  const logout = () => {
    localStorage.removeItem('jobhuntly_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
