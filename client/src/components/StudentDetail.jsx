import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById } from "../services/studentAPI";
import "../styles/StudentDetail.css";

function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  getStudentById(id)
    .then((data) => {
      if (!data || data.error) {
        console.error("Student not found");
      } else {
        setStudent(data);
      }
    });
}, [id]);

  if (!student) return <p className="loading">Loading student details...</p>;

  return (
    <div className="student-detail">
      <h2>{student.name}</h2>
      <ul>
        <li><strong>ID:</strong> {student.id}</li>
        <li><strong>Age:</strong> {student.age}</li>
        <li><strong>Mobile:</strong> {student.Mobile}</li>
        {student.email && <li><strong>Email:</strong> {student.email}</li>}
        {student.dob && <li><strong>DOB:</strong> {new Date(student.dob).toLocaleDateString()}</li>}
        {student.address && <li><strong>Address:</strong> {student.address}</li>}
        <li><strong>Status:</strong> {student.status}</li>
        <li><strong>Enrolled On:</strong> {new Date(student.enrolledOn).toLocaleDateString()}</li>
      </ul>

      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}

export default StudentDetail;