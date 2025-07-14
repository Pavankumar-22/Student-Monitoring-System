import React, { useEffect, useState } from "react";
import { getAllCourses, deleteCourse } from "../../../api/courseAPI";
import { getAllEnrollments } from "../../../api/enrollmentAPI"; // 👈 Add this
import SearchBar from "../../../shared/layout/SearchBar";
import CourseCard from "../components/CourseCard";
import "../../../styles/Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]); // 👈 Add this

  useEffect(() => {
    getAllCourses().then((data) => {
      setCourses(data);
      setFiltered(data);
      setSelectedCourse(data[0] || null);
    });

    getAllEnrollments().then((data) => {
      setEnrollments(data);
    });
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const results = courses.filter((c) => {
      const name = c.name?.toLowerCase() || "";
      const code = c.code?.toLowerCase() || "";
      const instructor = c.instructor?.toLowerCase() || "";
      return name.includes(lower) || code.includes(lower) || instructor.includes(lower);
    });
    setFiltered(results);
    if (!results.find((c) => c._id === selectedCourse?._id)) {
      setSelectedCourse(results[0] || null);
    }
  }, [searchTerm, courses]);

  const handleSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    const updated = courses.filter((c) => c._id !== id);
    setCourses(updated);
    setFiltered(updated);
    if (selectedCourse?._id === id) {
      setSelectedCourse(null);
    }
  };

  return (
    <div className="course-layout">
      <aside className="course-sidebar">
        <h2>📚 Courses</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ul className="course-list">
          {filtered.map((course) => (
            <li
              key={course._id}
              className={`course-list-item ${
                selectedCourse?._id === course._id ? "active" : ""
              }`}
              onClick={() => handleSelect(course)}
            >
              <div className="course-summary">
                <strong>{course.code}</strong>
                <p className="course-name">{course.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <main className="course-main">
        {selectedCourse ? (
          <CourseCard
            course={selectedCourse}
            onDelete={handleDelete}
            layout="detail"
            enrollments={enrollments} // ✅ Pass enrollments here
          />
        ) : (
          <p className="course-empty">📌 Select a course to view details</p>
        )}
      </main>
    </div>
  );
}

export default Courses;
