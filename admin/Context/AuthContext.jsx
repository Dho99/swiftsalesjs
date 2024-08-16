import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true); 
  const refreshToken = (newToken) => {
    try{
      localStorage.removeItem('token');
      localStorage.setItem('token', newToken);
      setToken(newToken)
    }catch(err){
      console.log('Token refresh failed');
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false); 
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, loading, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
