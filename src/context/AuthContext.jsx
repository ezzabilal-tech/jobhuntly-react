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
    if (!email || !password) {
      return { success: false, error: 'Please enter email and password.' };
    }

    // Check if it's the Google mock login
    if (email === 'google.user@gmail.com') {
      const googleUser = {
        name: 'Google User',
        email,
        role,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      };
      localStorage.setItem('jobhuntly_user', JSON.stringify(googleUser));
      setUser(googleUser);
      return { success: true };
    }

    // Load registered users from database
    const usersRaw = localStorage.getItem('jobhuntly_users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!foundUser) {
      return { success: false, error: 'No account found with this email. Please sign up first!' };
    }

    if (foundUser.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const sessionUser = {
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      avatar: foundUser.avatar,
    };

    localStorage.setItem('jobhuntly_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true };
  };

  const signup = (name, email, password, role = 'seeker') => {
    if (!name || !email || !password) {
      return { success: false, error: 'Please fill all fields.' };
    }
    if (password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }

    // Load users database
    const usersRaw = localStorage.getItem('jobhuntly_users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    // Check if email already registered
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'An account with this email already exists. Try logging in!' };
    }

    // Create new user entry
    const newUser = {
      name,
      email,
      password,
      role,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    };

    // Save to users database
    users.push(newUser);
    localStorage.setItem('jobhuntly_users', JSON.stringify(users));

    // Create session user
    const sessionUser = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
    };
    localStorage.setItem('jobhuntly_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true };
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
