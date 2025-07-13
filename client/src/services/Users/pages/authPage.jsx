import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <div>
        <button onClick={() => setShowLogin(true)}>Login</button>
        <button onClick={() => setShowLogin(false)}>Register</button>
      </div>
      {showLogin ? <LoginForm /> : <RegistrationForm />}
    </div>
  );
}

export default AuthPage;
