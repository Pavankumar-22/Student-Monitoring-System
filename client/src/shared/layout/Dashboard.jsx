import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const sections = [
    { label: "Students", route: "/students", emoji: "👨‍🎓" },
    { label: "Enrollments", route: "/enrollments", emoji: "📝" },
    { label: "Attendance", route: "/attendance", emoji: "📅" },
    // { label: "Fees", route: "/fees", emoji: "💰" },
    { label: "Users", route: "/users", emoji: "🙍" },
  ];

  return (
    <div className="dashboard-menu">
      <h2>📊 Dashboard</h2>
      <div className="dashboard-grid">
        {sections.map((section) => (
          <div
            key={section.label}
            className="dashboard-card"
            onClick={() => navigate(section.route)}
          >
            <span className="card-icon">{section.emoji}</span>
            <h3>{section.label}</h3>
            <p>Manage {section.label.toLowerCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;