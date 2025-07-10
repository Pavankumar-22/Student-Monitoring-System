import React, { useState } from "react";
import RegisterForm from "../components/RegistrationForm";
import { registerUser } from "../../../api/authAPI";

function RegisterPage() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (formData) => {
    const res = await registerUser(formData);
    if (res.success) {
      setSuccess(true);
      setError(null);
      // maybe redirect or reset form
    } else {
      setError(res.message);
      setSuccess(false);
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Registration successful! Please login.</p>}
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
}

export default RegisterPage;
