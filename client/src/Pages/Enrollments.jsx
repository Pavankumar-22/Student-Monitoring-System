import React, { useEffect, useState } from "react";
import { getAllEnrollments, deleteEnrollment } from "../services/enrollmentAPI";
import SearchBar from "../components/SearchBar";
import "../styles/StudentDetail.css";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    getAllEnrollments().then((data) => {
      setEnrollments(data);
      setFilteredEnrollments(data);
      if (data.length > 0) {
        setSelectedStudentId(data[0].student?._id || null);
      }
    });
  }, []);

  // Filter enrollments based on search term (search by student name or course info)
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const results = enrollments.filter((e) => {
      const studentName = e.student?.name?.toLowerCase() || "";
      const courseName = e.course?.name?.toLowerCase() || "";
      const courseCode = e.course?.code?.toLowerCase() || "";
      const status = e.status?.toLowerCase() || "";
      return (
        studentName.includes(lower) ||
        courseName.includes(lower) ||
        courseCode.includes(lower) ||
        status.includes(lower)
      );
    });
    setFilteredEnrollments(results);

    // If selected student is not in filtered results, select first student from results
    if (!results.some((e) => e.student?._id === selectedStudentId)) {
      setSelectedStudentId(results[0]?.student?._id || null);
    }
  }, [searchTerm, enrollments, selectedStudentId]);

  // Get unique students from filteredEnrollments for sidebar
  const uniqueStudents = Array.from(
    new Map(
      filteredEnrollments.map((e) => [e.student?._id, e.student])
    ).values()
  );

  // Get enrollments for selected student
  const selectedStudentEnrollments = filteredEnrollments.filter(
    (e) => e.student?._id === selectedStudentId
  );

  const handleDelete = async (id) => {
    await deleteEnrollment(id);
    const updated = enrollments.filter((e) => e._id !== id);
    setEnrollments(updated);
  };

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <h2>Students</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ul className="dash-student-list">
          {uniqueStudents.map((student) => (
            <li
              key={student._id}
              className={`dash-student-item ${
                selectedStudentId === student._id ? "active" : ""
              }`}
              onClick={() => setSelectedStudentId(student._id)}
            >
              <strong>{student.name}</strong>
            </li>
          ))}
        </ul>
      </aside>

      <main className="dash-main">
        {selectedStudentEnrollments.length > 0 ? (
          <div className="enrollment-detail">
            <h3>Enrollments for {selectedStudentEnrollments[0].student?.name}</h3>
            <ul>
              {selectedStudentEnrollments.map((enrollment) => (
                <li key={enrollment._id} className="enrollment-item">
                  <p>
                    <strong>Course:</strong> {enrollment.course?.code} - {enrollment.course?.name}
                  </p>
                  <p>
                    <strong>Status:</strong> {enrollment.status}
                  </p>
                  <p>
                    <strong>Enrolled Date:</strong> {new Date(enrollment.enrolledDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Grade:</strong> {enrollment.grade || "Not graded"}
                  </p>
                  <button
                    className="danger"
                    onClick={() => {
                      if (
                        window.confirm("Are you sure you want to delete this enrollment?")
                      ) {
                        handleDelete(enrollment._id);
                      }
                    }}
                  >
                    Delete Enrollment
                  </button>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="dash-empty">Select a student to view enrollments</p>
        )}
      </main>
    </div>
  );
}

export default Enrollments;
