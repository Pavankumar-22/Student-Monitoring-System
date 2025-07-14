// src/services/Users/components/LoginForm.jsx
import React, { useState } from "react";
import { useAuth } from "../../../context/authContext";
import { loginUser } from "../../../api/authAPI";
import "../../../styles/LoginForm.css"

function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "staff", // Default role
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const result = await loginUser(form); // Send username, password, role

    if (!result.success) {
      throw new Error(result.message);
    }

    const user = result.data.user;
    if (user.role !== form.role) {
      throw new Error("Role mismatch");
    }

    login(user); // Save user in context
    setMsg("Login successful");
  } catch (err) {
    setMsg("Login failed: " + err.message);
  }
};


  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="staff">Login as Staff</option>
        <option value="admin">Login as Admin</option>
      </select>
      <button type="submit">Login</button>
      <p>{msg}</p>
    </form>
  );
}

export default LoginForm;
