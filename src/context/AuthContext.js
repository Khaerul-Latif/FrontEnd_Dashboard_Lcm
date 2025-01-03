import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const API_URL = "http://127.0.0.1:8001/api/";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
      getUser(); // Fetch user data whenever a token is set
    } else {
      sessionStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    MySwal.fire({
      title: "Logging in...",
      text: "Please wait while we process your login.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
    try {
      const response = await axios.post(`${API_URL}login`, { email, password });

      setToken(response.data.token);

      // Fetch user details after login
      const userDetails = await getUser(response.data.token);
      if (userDetails) {
        setUser(userDetails);
        MySwal.fire({
          title: "Login Successful",
          text: "You have successfully logged in.",
          icon: "success",
    
        });
        return true;
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      return false;
    }
  };

  const getUser = async (accessToken = token) => {
    try {
      const response = await axios.get(`${API_URL}user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.user; // Return user data if successful
    } catch (error) {
      console.error(
        "Failed to fetch user:",
        error.response?.data?.message || error.message
      );
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
