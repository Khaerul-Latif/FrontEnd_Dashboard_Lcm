import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Use useAuth instead of AuthContext
import ProtectedRoute from "./components/ProtectedRoute";
import AppAdmin from "./admin/AppAdmin";
import { ProspectProvider } from "./context/ProspectContext";
import LoginAdmin from "./admin/pages/login/LoginAdmin";
import { ProgramProvider } from "./context/ProgramContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  const { token } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
    <Router>
     <Routes><Route
          path="/login"
          element={
            // token 
            //   ? <Navigate to="/admin/dashboard" />
              // : 
              <LoginAdmin />
          }
        />

        {/* Rute Admin */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              
             <ProspectProvider>
             <ProgramProvider >
              <AppAdmin />
              </ProgramProvider>
              </ProspectProvider>
              <ReactQueryDevtools />
              
            </ProtectedRoute>
          }
        /> 

        {/* Redirect jika tidak ada rute */}
        <Route
          path="*"
          element={<Navigate to={token ? "/admin/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
    </QueryClientProvider>
  );
}

export default App;

