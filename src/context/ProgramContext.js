// src/context/ProgramContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const APP_URL = process.env.API_URL_LP;

const ProgramContext = createContext();

export const ProgramProvider = ({ children }) => {
  const [programs, setPrograms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrograms = async (programId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${APP_URL}programs/${programId}`);
      // const cleanedData = response.data;
      console.log("cleanedData", response.data);
      // const jsonData = JSON.parse(cleanedData);
      setPrograms(response.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setIsLoading(false);
      console.log("program dari ", programs)
    }
  };

  return (
    <ProgramContext.Provider value={{ programs, isLoading, fetchPrograms }}>
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgram = () => useContext(ProgramContext);
