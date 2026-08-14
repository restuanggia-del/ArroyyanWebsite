import { createContext, useContext, useState } from "react";
import { login as loginService } from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("admin");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const res = await loginService(email, password);
    setAdmin(res.data);
    localStorage.setItem("admin", JSON.stringify(res.data));
    return res.data;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  const updateAdmin = (dataBaru) => {
    setAdmin((prev) => {
      const gabungan = { ...prev, ...dataBaru };
      localStorage.setItem("admin", JSON.stringify(gabungan));
      return gabungan;
    });
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, updateAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
