import React, { useState, useEffect } from "react";
import { getAllStudents } from "../../../api/studentAPI";
import { getAllCourses } from "../../../api/courseAPI";
import '../styles/StudentForm.css';

function EnrollmentForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    student: "",
    course: "",
    enrolledDate: "",
    status: "active",
    grade: "",
  });

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    Promise.all([getAllStudents(), getAllCourses()])
      .then(([studentData, courseData]) => {
        setStudents(studentData.sort((a, b) => a.name.localeCompare(b.name)));
        setCourses(courseData.sort((a, b) => a.name.localeCompare(b.name)));
      });
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        student: initialData.student?._id || "",
        course: initialData.course?._id || "",
        enrolledDate: initialData.enrolledDate ? initialData.enrolledDate.split('T')[0] : "",
        status: initialData.status || "active",
        grade: initialData.grade || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { student, course, enrolledDate, status } = formData;
    if (!student || !course || !enrolledDate || !status) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit(formData);
    if (!initialData._id) {
      setFormData({ student: "", course: "", enrolledDate: "", status: "active", grade: "" });
    }
  };

  const isFormValid = formData.student && formData.course && formData.enrolledDate && formData.status;

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <label>
        Student:
        <select
          name="student"
          value={formData.student}
          onChange={handleChange}
          required
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Course:
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.code} - {course.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Enrolled Date:
        <input
          type="date"
          name="enrolledDate"
          value={formData.enrolledDate}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Status:
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="dropped">Dropped</option>
          <option value="suspended">Suspended</option>
        </select>
      </label>

      <label>
        Grade (Optional):
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          placeholder="e.g., A, B+, 85"
        />
      </label>

      <button type="submit" disabled={!isFormValid}>
        {initialData && initialData._id ? "Update Enrollment" : "Add Enrollment"}
      </button>
    </form>
  );
}

export default EnrollmentForm;
