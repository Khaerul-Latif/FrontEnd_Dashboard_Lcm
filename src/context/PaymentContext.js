// src/context/PaymentContext.js
import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOrder = async (orderData) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/form-pp", orderData);
      alert("Pesanan Anda berhasil dibuat!");
      console.log("Order Success:", response.data);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Terjadi kesalahan saat mengirim pesanan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PaymentContext.Provider value={{ handleOrder, isLoading }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
