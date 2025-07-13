// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Navbar from "./shared/layout/Navbar";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> {}
        <Navbar />
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
