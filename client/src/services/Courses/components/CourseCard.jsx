import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/CourseCard.css";
import StudentCard from "../../students/components/StudentCard";

function CourseCard({ course, onDelete, layout, enrollments }) {
  const navigate = useNavigate();
  const [selectedStudentId, setSelectedStudentId] = useState("");

  if (!course) return null;

  const studentsInThisCourse = Array.from(
  new Map(
    (enrollments || [])
      .filter((enr) => enr.course._id === course._id) // giving only current enrolled without duplicates
      .map((enr) => [enr.student._id, enr.student]) // filtering the key by _id 
      ).values()
    );

  const selectedStudent = studentsInThisCourse.find(
    (s) => s._id === selectedStudentId
  );

  const handleStudentChange = (e) => {
    setSelectedStudentId(e.target.value);
  };

  if (layout === "detail") {
    return (
      <div className="course-card">
        <h2 className="course-title">{course.name || "Untitled Course"}</h2>
        <div className="course-meta">
          <div><strong>Code:</strong> {course.code || "N/A"}</div>
          <div><strong>Instructor:</strong> {course.instructor || "N/A"}</div>
          <div><strong>Credits:</strong> {course.credits || "N/A"}</div>
          <div><strong>Department:</strong> {course.department || "N/A"}</div>
          <div><strong>Description:</strong> {course.description || "N/A"}</div>
          <div><strong>Schedule:</strong> {course.schedule || "N/A"}</div>
          <div><strong>Capacity:</strong> {course.capacity || "N/A"}</div>
          <div><strong>Enrolled:</strong> {studentsInThisCourse.length}</div>
        </div>

        {/* 🔽 Student dropdown */}
        <div className="dropdown-container">
          <label htmlFor="student-dropdown">Students Enrolled:  </label>
          <select id="student-dropdown" onChange={handleStudentChange} value={selectedStudentId}>
            <option value="">-- Select a student --</option>
            {studentsInThisCourse.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        {selectedStudentId && (
          <div style={{ marginTop: "20px" }}>
            <StudentCard student={selectedStudent} layout="detail" />
          </div>
        )}


          
        <div className="course-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/edit-course/${course._id}`)}
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this course?")) {
                onDelete(course._id);
              }
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    );
  }

  // 🧾 Fallback layout
  return (
    <div className="course-card simple">
      <h3 className="course-title">{course.name || "Untitled Course"}</h3>
      <p><strong>Code:</strong> {course.code || "N/A"}</p>
      <p><strong>Instructor:</strong> {course.instructor || "N/A"}</p>
      <p><strong>Credits:</strong> {course.credits || "N/A"}</p>
    </div>
  );
}

export default CourseCard;
