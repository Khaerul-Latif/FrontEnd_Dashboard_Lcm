import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const APP_URL = "http://127.0.0.1:8000/api/";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Mengambil CSRF token dari meta tag dan mengatur header Axios
  const csrfToken = document.head.querySelector(
    'meta[name="csrf-token"]'
  )?.content;
  if (csrfToken) {
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  }

  // Menyimpan token di localStorage setiap kali token berubah
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${APP_URL}login`, { email, password });

      setUser(response.data.user);
      setToken(response.data.token); // Perubahan token akan disimpan oleh useEffect
      return true;
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null); // Menghapus token akan menghapusnya dari localStorage melalui useEffect
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
