// src/services/Users/components/RegistrationForm.jsx
import React, { useState } from "react";
import { registerUser } from "../../../api/userAPI";
import "../../../styles/RegistrationForm.css"

function RegistrationForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "staff", // default and only role allowed here
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(form);
      setMsg("Registered successfully");
    } catch (err) {
      setMsg(err.message || "Registration failed");
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      {/* No role dropdown */}
      <button type="submit">Register</button>
      <p>{msg}</p>
    </form>
  );
}

export default RegistrationForm;
