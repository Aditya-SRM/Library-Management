import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, role: 'guest' });

  const login = (role) => {
    setAuth({ isAuthenticated: true, role });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, role: 'guest' });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
