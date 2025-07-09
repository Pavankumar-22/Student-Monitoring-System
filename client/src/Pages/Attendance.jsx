import React, { useEffect, useState } from "react";
import { getAllAttendanceRecords, markAttendance } from "../services/attendanceAPI";
import SearchBar from "../components/SearchBar";
import AttendanceTable from "../components/AttendanceTable";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchByDate = async () => {
      if (!selectedDate) return;
      const data = await getAllAttendanceRecords(selectedDate); // Backend accepts date param
      setAttendance(data);
      setFiltered(data);
    };
    fetchByDate();
  }, [selectedDate]);

  useEffect(() => {
    let results = attendance;

    // Filter by search term
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      results = results.filter((a) => {
        const studentName = a.student?.name?.toLowerCase() || "";
        const courseName = a.course?.name?.toLowerCase() || "";
        const courseCode = a.course?.code?.toLowerCase() || "";
        const status = a.status?.toLowerCase() || "";
        return (
          studentName.includes(lower) ||
          courseName.includes(lower) ||
          courseCode.includes(lower) ||
          status.includes(lower)
        );
      });
    }

    // Filter by date — redundant if backend filters, but keeping for safety
    if (selectedDate) {
      results = results.filter((a) => {
        const attendanceDate = new Date(a.date).toISOString().split("T")[0];
        return attendanceDate === selectedDate;
      });
    }

    setFiltered(results);
  }, [searchTerm, selectedDate, attendance]);

  // New handler for status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await markAttendance(id, { status: newStatus });
      // Update local state
      const updated = attendance.map((a) =>
        a._id === id ? { ...a, status: newStatus } : a
      );
      setAttendance(updated);
      setFiltered(updated);
    } catch (error) {
      console.error("Error updating attendance status:", error);
    }
  };

  return (
    <div className="attendance-layout">
      <div className="attendance-header">
        <h2>Attendance Management</h2>
        <div className="attendance-filters">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-filter"
          />
        </div>
      </div>

      <div className="attendance-content">
        <AttendanceTable
          attendanceData={filtered}
          onStatusChange={handleStatusChange} // pass new prop for status dropdown
        />
      </div>
    </div>
  );
}

export default Attendance;
