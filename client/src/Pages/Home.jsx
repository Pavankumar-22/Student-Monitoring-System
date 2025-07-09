import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const sections = [
    {
      label: "Students",
      route: "/dashboard",
      desc: "Add, view, and manage student records.",
    },
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Student Monitoring System</h1>
        <p>Manage and analyze all academic data efficiently</p>
        <Link to="/dashboard" className="home-button">Go to Dashboard</Link>
      </header>

      {/* <section className="home-features">
        {sections.map((section) => (
          <div key={section.label} className="feature-card">
            <h3>{section.label}</h3>
            <p>{section.desc}</p>
            <Link to={section.route} className="feature-link">Manage {section.label}</Link>
          </div>
        ))}
      </section> */}

      <footer className="home-footer">
        © 2025 Student Monitoring System
      </footer>
    </div>
  );
};

export default Home;
