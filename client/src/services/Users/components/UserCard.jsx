import React from "react";
// import "../../../styles/";

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
        <span className={`role-badge ${user.role || "unknown"}`}>
          {user.role || "Unknown"}
        </span>
      </div>
    </li>
  );
}

export default UserCard;
