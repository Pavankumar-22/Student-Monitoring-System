import React, { useState, useEffect } from "react";
import '../styles/StudentForm.css';

function StudentForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    Mobile: "",
    email: "",
    dob: "",
    address: "",
    status: "active",
    enrolledOn: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || "",
        name: initialData.name || "",
        age: initialData.age || "",
        Mobile: initialData.Mobile || "",
        email: initialData.email || "",
        dob: initialData.dob || "",
        address: initialData.address || "",
        status: initialData.status || "active",
        enrolledOn: initialData.enrolledOn || ""
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, name, age, Mobile } = formData;
    if (!id || !name || !age || !Mobile) {
      alert("Please fill in all required fields.");
      return;
    }
    const payload = {
      ...formData,
      age: Number(formData.age),
      enrolledOn: formData.enrolledOn || new Date().toISOString()
    };
    onSubmit(payload);
    setFormData({
      id: "",
      name: "",
      age: "",
      Mobile: "",
      email: "",
      dob: "",
      address: "",
      status: "active",
      enrolledOn: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <label>
        ID:
        <input type="text" name="id" value={formData.id} onChange={handleChange} required disabled={!!initialData.id} />
      </label>

      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>

      <label>
        Age:
        <input type="number" name="age" value={formData.age} onChange={handleChange} required min="1" />
      </label>

      <label>
        Mobile:
        <input type="text" name="Mobile" value={formData.Mobile} onChange={handleChange} required pattern="\d{10}" title="10 digit mobile number" />
      </label>

      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>

      <label>
        Date of Birth:
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
      </label>

      <label>
        Address:
        <textarea name="address" value={formData.address} onChange={handleChange} />
      </label>

      <label>
        Status:
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="graduated">Graduated</option>
        </select>
      </label>

      <button type="submit">
        {initialData.id ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;