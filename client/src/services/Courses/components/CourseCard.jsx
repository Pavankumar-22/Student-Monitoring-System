import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/CourseCard.css";

function CourseCard({ course, onDelete, layout }) {
  const navigate = useNavigate();

  if (!course) return null;

  if (layout === "detail") {
    return (
      <div className="course-card">
        <h2 className="course-title">{course.name || "Untitled Course"}</h2>
        <div className="course-meta">
          <div><strong>Code:</strong> <span>{course.code || "N/A"}</span></div>
          <div><strong>Instructor:</strong> <span>{course.instructor || "N/A"}</span></div>
          <div><strong>Credits:</strong> <span>{course.credits || "N/A"}</span></div>
          <div><strong>Department:</strong> <span>{course.department || "N/A"}</span></div>
          <div><strong>Description:</strong> <span>{course.description || "N/A"}</span></div>
          <div><strong>Schedule:</strong> <span>{course.schedule || "N/A"}</span></div>
          <div><strong>Capacity:</strong> <span>{course.capacity || "N/A"}</span></div>
          <div><strong>Enrolled:</strong> <span>{course.enrolled || 0}</span></div>
        </div>

        <div className="course-actions">
          <button className="btn btn-primary" onClick={() => navigate(`/edit-course/${course._id}`)}>
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
