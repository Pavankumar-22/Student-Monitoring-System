import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/authAPI";
import "../../../styles/LoginForm.css";

function LoginForm() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(credentials);
    if (res.success) {
      // save token, for example:
      localStorage.setItem("token", res.data.token);
      navigate("/"); // redirect after login
    } else {
      setError(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label>Username:
        <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
      </label>
      <label>Password:
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
