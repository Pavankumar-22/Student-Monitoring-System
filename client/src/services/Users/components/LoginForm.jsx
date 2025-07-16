import React, { useState } from "react";
import { useAuth } from "../../../context/authContext";
import { loginUser } from "../../../api/authAPI";
import "../../../styles/LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "staff",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  const validateField = (name, value) => {
    let err = "";

    if (name === "username") {
      if (/\s/.test(value)) {
        err = "Username cannot contain spaces";
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        err = "Password must be at least 6 characters";
      } else if (!/[a-zA-Z]/.test(value) || !/\d/.test(value) || !/[!@#$%^&*]/.test(value)) {
        err = "Password must include letters, numbers, and a special character";
      } else if (/\s/.test(value)) {
        err = "Password cannot contain spaces";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check before submit
    if (errors.username || errors.password) {
      setMsg("Please fix the errors above.");
      return;
    }

    try {
      const result = await loginUser(form);

      if (!result.success) {
        throw new Error(result.message);
      }

      if (result.data.user.role !== form.role) {
        throw new Error("Role mismatch");
      }

      login(result.data.user);
      setMsg("Login successful");
      navigate("/dashboard");
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
      {errors.username && <p className="error">{errors.username}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      {errors.password && <p className="error">{errors.password}</p>}

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="staff">Login as Staff</option>
        <option value="admin">Login as Admin</option>
      </select>

      <button type="submit">Login</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

export default LoginForm;
