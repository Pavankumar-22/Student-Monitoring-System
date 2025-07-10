import React from "react";
import "../../../styles/AttendanceTable.css";

function AttendanceTable({ attendanceData, onStatusChange }) {
  if (!attendanceData || attendanceData.length === 0) {
    return <p className="attendance-empty">No attendance records found</p>;
  }

  return (
    <div className="attendance-table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Student</th>
            <th>Course</th>
            <th>Status</th>
            {/* Removed Actions column */}
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record) => (
            <tr key={record._id} className="attendance-row">
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.studentId?.name || "N/A"}</td>
              <td>
                {record.course?.code}{" "}
                <span className="course-name">{record.course?.name}</span>
              </td>
              <td>
                <select
                  className={`attendance-status ${record.status.toLowerCase()}`}
                  value={record.status}
                  onChange={(e) => onStatusChange(record._id, e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
