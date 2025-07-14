import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/StudentCard.css";

function StudentCard({ student, onDelete, layout, role }) {
  const navigate = useNavigate();

  if (!student) return null;

  if (layout === "detail") {
    return (
      <div className="student-card-detail">
        <h3>{student.name || "N/A"}</h3>
        <p><strong>ID:</strong> {student.id || "N/A"}</p>
        <p><strong>Age:</strong> {student.age || "N/A"}</p>
        <p><strong>Mobile:</strong> {student.Mobile || "N/A"}</p>

        {student.email && <p><strong>Email:</strong> {student.email}</p>}
        {student.dob && <p><strong>Date of Birth:</strong> {new Date(student.dob).toLocaleDateString()}</p>}
        {student.address && <p><strong>Address:</strong> {student.address}</p>}
        {student.status && <p><strong>Status:</strong> {student.status}</p>}

        {student.guardian?.name && (
          <div className="guardian-info">
            <strong>Guardian:</strong>
            <p>Name: {student.guardian.name}</p>
            {student.guardian.phone && <p>Phone: {student.guardian.phone}</p>}
            {student.guardian.relation && <p>Relation: {student.guardian.relation}</p>}
          </div>
        )}

        <div className="student-card-actions">
          <button onClick={() => navigate(`/edit/${student.id}`)}>Edit</button>

          {/* ✅ Conditionally render Delete button */}
          {role === "admin" && (
            <button
              className="danger"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this student?")) {
                  onDelete(student.id);
                }
              }}
            >
              Delete
            </button>
          )}

          <button onClick={() => navigate(`/view/${student.id}`)}>View</button>
        </div>
      </div>
    );
  }

  return null;
}

export default StudentCard;
