import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    // Memastikan pengguna sudah terautentikasi dan data sudah terisi
    if (token) {
      setIsLoading(false);
    }
  }, [token]);

  // Menunggu data terisi terlebih dahulu
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <h3>Loading...</h3> {/* Menggunakan h3 untuk ukuran font */}
      </div>
    );
  }
  
  // Jika ada token dan role_id cocok, tampilkan komponen anak
  return children;
}

export default ProtectedRoute;
