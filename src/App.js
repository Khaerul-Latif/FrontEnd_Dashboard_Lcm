import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Use useAuth instead of AuthContext
import LoginAdmin from "./admin/auth/LoginAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import AppAdmin from "./admin/AppAdmin";
import AdminDaftarPesertaSP from "./admin/pages/lifecamp/AdminDaftarPesertaSP";
import {ProspectProvider} from "./context/ProspectContext";

function App() {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/admin/dashboard" /> : <LoginAdmin />}
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              
              <ProspectProvider>  {/* Pastikan ProspectProvider membungkus komponen */}
       
              <AppAdmin />
    </ProspectProvider  >
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

