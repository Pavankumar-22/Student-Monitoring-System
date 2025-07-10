// src/router/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Students from "../services/students/pages/Students";
import Dashboard from "../shared/layout/Dashboard";
import AddStudent from "../services/students/pages/AddStudent";
import EditStudent from "../services/students/pages/EditStudent";
import Analytics from "../shared/Analytics";
import Enrollments from "../services/Enrollments/pages/Enrollments";
import Attendance  from "../services/Attendance/pages/Attendance";
import StudentDetail from "../services/students/components/StudentDetail";
import Home from "../shared/layout/Home";
import Courses from "../services/Courses/pages/Courses";
import Users from "../services/Users/pages/Users"

function AppRouter() {
  return (
    <Routes>
      <Route path="/students" element={<Students />} />
      <Route path="/add" element={<AddStudent />} />
      <Route path="/edit/:id" element={<EditStudent />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/addstudent" element = {<AddStudent/>} />
      <Route path="/enrollments" element = {<Enrollments/>} />
      <Route path="/courses" element = {<Courses/>} />
      <Route path="/attendance" element = {<Attendance/>}/>
      <Route path="/view/:id" element={<StudentDetail />} />
      <Route path="/users" element={<Users/>}/>
    </Routes>
  );
}

export default AppRouter;
