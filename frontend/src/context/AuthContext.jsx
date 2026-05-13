import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for existing login token when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("aura_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("aura_user", JSON.stringify(userData));
    localStorage.setItem("aura_token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("aura_user");
    localStorage.removeItem("aura_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
