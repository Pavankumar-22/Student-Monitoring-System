import React, { useState } from "react";
import { registerUser } from "../../../api/userAPI";
import "../../../styles/RegistrationForm.css";

function RegistrationForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    address: "",
    gender: "",
    status: "active",
    role: "staff",  // Default role
  });

  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let err = "";

    switch (name) {
      case "username":
        if (/\s/.test(value)) err = "Username cannot contain spaces";
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) err = "Invalid email format";
        break;
      case "password":
        if (value.length < 6) err = "Password must be at least 6 characters";
        else if (!/[a-zA-Z]/.test(value) || !/\d/.test(value) || !/[!@#$%^&*]/.test(value))
          err = "Password must include letters, numbers & special chars";
        else if (/\s/.test(value)) err = "Password cannot contain spaces";
        break;
      case "mobile":
        if (!/^\d{10}$/.test(value)) err = "Mobile must be 10 digits";
        break;
      case "dob":
      case "address":
      case "gender":
      case "status":
        if (!value) err = "This field is required";
        break;
      default:
        break;
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

    Object.entries(form).forEach(([name, value]) => validateField(name, value));

    const hasErrors = Object.values(errors).some((err) => err);
    if (hasErrors) {
      setMsg("Please fix validation errors");
      return;
    }

    try {
      await registerUser(form);
      setMsg("✅ Registered successfully");
    } catch (err) {
      setMsg(err.message || "❌ Registration failed");
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
      {errors.username && <p className="error">{errors.username}</p>}

      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      {errors.email && <p className="error">{errors.email}</p>}

      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      {errors.password && <p className="error">{errors.password}</p>}

      <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={(e) => {
          const val = e.target.value;
            if (/^\d{0,10}$/.test(val)) handleChange(e);  // Only digits, max 10
            }} maxLength="10" inputMode="numeric" pattern="\d*" required />
      {errors.mobile && <p className="error">{errors.mobile}</p>}

      <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
      {errors.dob && <p className="error">{errors.dob}</p>}

      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
      {errors.address && <p className="error">{errors.address}</p>}

      <select name="gender" value={form.gender} onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <p className="error">{errors.gender}</p>}

      <select name="status" value={form.status} onChange={handleChange} required>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      {errors.status && <p className="error">{errors.status}</p>}

      <button type="submit">Register</button>
      <p className={msg.includes("success") ? "success" : "error"}>{msg}</p>
    </form>
  );
}

export default RegistrationForm;
