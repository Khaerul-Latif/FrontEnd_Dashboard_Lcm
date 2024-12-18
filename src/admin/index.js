import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "../assets/vendor/fonts/boxicons.css";
import "../assets/vendor/css/core.css";
import "../assets/vendor/css/theme-default.css";
import "../assets/css/demo.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/libs/apex-charts/apex-charts.css";

// Memuat aplikasi React
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
