import React from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../../../api/studentAPI";
import StudentForm from "../components/StudentForm";
import "../../../styles/AddStudent.css";

function AddStudent() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await createStudent(formData);
      if (response && response.id) {
        alert("Student added successfully!");
        //navigate("/");
      } else {
        alert("Failed to add student");
      }
    } catch (err) {
      console.error("AddStudent error:", err);
      alert("Server error while adding student.");
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add New Student</h2>
      <StudentForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddStudent;
