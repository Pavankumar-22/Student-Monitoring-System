import React, { useEffect, useState } from "react";
import { getAllStudents, deleteStudent } from "../services/studentAPI";
import SearchBar from "../components/SearchBar";
import StudentCard from "../components/StudentCard";
import "../styles/Students.css";
import { useNavigate } from "react-router-dom";


function Students() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllStudents().then((data) => {
      setStudents(data);
      setFiltered(data);
      setSelectedStudent(data[0] || null);
    });
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const results = students.filter((s) => {
      const name = s.name?.toLowerCase() || "";
      const id = s._id?.toLowerCase() || "";
      return name.includes(lower) || id.includes(lower);
    });
    setFiltered(results);
    if (!results.find((s) => s._id === selectedStudent?._id)) {
      setSelectedStudent(results[0] || null);
    }
  }, [searchTerm, students]);

  const handleSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    setFiltered(updated);
    if (selectedStudent?.id === id) {
      setSelectedStudent(null);
    }
  };

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <h2>Students</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ul className="dash-student-list">
          {filtered.map((student) => (
            <li
              key={student._id}
              className={`dash-student-item ${
                selectedStudent?._id === student._id ? "active" : ""
              }`}
              onClick={() => handleSelect(student)}
            >
              {student.name}
            </li>
          ))}
        </ul>
        <button onClick={() => navigate("/AddStudent")} className="add-button">➕ Add New Student</button>
      </aside>
      <main className="dash-main">
        {selectedStudent ? (
          <StudentCard
            student={selectedStudent}
            onDelete={handleDelete}
            layout="detail"
          />
        ) : (
          <p className="dash-empty">Select a student</p>
        )}
      </main>
    </div>
  );
}

export default Students;
