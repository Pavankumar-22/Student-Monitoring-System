import React, { useEffect, useState } from "react";
import { getAllStudents } from "../api/studentAPI";
import { getAllCourses } from "../api/courseAPI";
import { getAllEnrollments } from "../api/enrollmentAPI";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const barOptions = {
  ageDistribution: "Age Group Distribution",
  courseEnrollment: "Course Enrollment Counts",
};

const pieOptions = {
  ageProportions: "Age Group Proportions",
  enrollmentStatus: "Enrollment Status Distribution",
};

function Analytics() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBar, setSelectedBar] = useState("ageDistribution");
  const [selectedPie, setSelectedPie] = useState("ageProportions");

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllStudents(), getAllCourses(), getAllEnrollments()])
      .then(([studentData, courseData, enrollmentData]) => {
        setStudents(studentData);
        setCourses(courseData);
        setEnrollments(enrollmentData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (!students.length || !courses.length || !enrollments.length)
    return <p>No data available.</p>;

  // --- Data calculations for charts ---

  // Age groups for students
  const ageGroups = {
    "0–10": 0,
    "11–20": 0,
    "21–30": 0,
    "31–40": 0,
    "41+": 0,
  };
  students.forEach(({ age }) => {
    if (age <= 10) ageGroups["0–10"]++;
    else if (age <= 20) ageGroups["11–20"]++;
    else if (age <= 30) ageGroups["21–30"]++;
    else if (age <= 40) ageGroups["31–40"]++;
    else ageGroups["41+"]++;
  });
  const ageGroupStats = Object.entries(ageGroups).map(([group, count]) => ({
    group,
    count,
  }));

  // Course enrollment counts
  const courseEnrollCount = {};
  courses.forEach((course) => {
    courseEnrollCount[course.code] = 0;
  });
  enrollments.forEach(({ course }) => {
    if (course && course.code) {
      courseEnrollCount[course.code] = (courseEnrollCount[course.code] || 0) + 1;
    }
  });

  // Enrollment status counts
  const statusCounts = { active: 0, completed: 0, dropped: 0, suspended: 0 };
  enrollments.forEach(({ status }) => {
    if (statusCounts.hasOwnProperty(status)) {
      statusCounts[status]++;
    }
  });

  // Prepare chart data
  const barChartData = {
    ageDistribution: {
      labels: ageGroupStats.map((s) => s.group),
      datasets: [
        {
          label: "Number of Students",
          data: ageGroupStats.map((s) => s.count),
          backgroundColor: "rgba(54, 162, 235, 0.7)",
        },
      ],
    },
    courseEnrollment: {
      labels: Object.keys(courseEnrollCount),
      datasets: [
        {
          label: "Enrollments per Course",
          data: Object.values(courseEnrollCount),
          backgroundColor: "rgba(255, 99, 132, 0.7)",
        },
      ],
    },
  };

  const pieChartData = {
    ageProportions: {
      labels: ageGroupStats.map((s) => s.group),
      datasets: [
        {
          data: ageGroupStats.map((s) => s.count),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    },
    enrollmentStatus: {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: [
            "#4CAF50", // green active
            "#2196F3", // blue completed
            "#FF9800", // orange dropped
            "#F44336", // red suspended
          ],
        },
      ],
    },
  };

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", fontFamily: "Segoe UI, sans-serif" }}>
      <h2>Analytics Dashboard</h2>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <div>
          <label>
            Bar Chart:
            <select value={selectedBar} onChange={(e) => setSelectedBar(e.target.value)}>
              {Object.entries(barOptions).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Pie Chart:
            <select value={selectedPie} onChange={(e) => setSelectedPie(e.target.value)}>
              {Object.entries(pieOptions).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 45%", minHeight: 250 }}>
          <Bar
            data={barChartData[selectedBar]}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              maintainAspectRatio: false,
            }}
          />
        </div>

        <div style={{ flex: "1 1 45%", minHeight: 250 }}>
          <Pie
            data={pieChartData[selectedPie]}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
