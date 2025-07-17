import React from "react";
import "../../../styles/UserCard.css";

function UserCard({ user, isActive, onSelect }) {
  if (!user) return null;

  return (
    <li
      className={`dash-student-item ${isActive ? "active" : ""}`}
      onClick={() => onSelect(user)}
    >
      <div>
        <strong>{user.username || "N/A"}</strong>
        <br />
        <small>{user.email || "N/A"}</small>
        <br />
        <small>Mobile: {user.mobile || "N/A"}</small>
        <br />
        <small>DOB: {user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}</small>
        <br />
        <small>Gender: {user.gender || "N/A"}</small>
        <br />
        <small>Address: {user.address || "N/A"}</small>
        <br />
        <small>Status: {user.status || "N/A"}</small>
        <br />
        <span className={`role-badge ${user.role || "unknown"}`}>
          {user.role || "Unknown"}
        </span>
      </div>
    </li>
  );
}

export default UserCard;
