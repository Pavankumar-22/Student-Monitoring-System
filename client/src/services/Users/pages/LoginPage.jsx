import React from "react";
import LoginForm from "../components/LoginForm";
import "../../../styles/LoginPage.css";

function LoginPage() {
  return (
    <div className="auth-page">
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
}

export default LoginPage;