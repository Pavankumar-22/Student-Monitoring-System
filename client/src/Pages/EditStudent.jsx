import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { getStudentById, updateStudent } from "../services/studentAPI";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    getStudentById(id)
      .then(setStudent)
      .catch((err) => {
        console.error("Failed to fetch student:", err);
        alert("Student not found!");
        navigate("/");
      });
  }, [id, navigate]);

  const handleUpdate = async (updatedData) => {
    try {
      await updateStudent(id, updatedData);
      alert("Student updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update student.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Student</h2>
      {student ? (
        <StudentForm initialData={student} onSubmit={handleUpdate} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditStudent;
