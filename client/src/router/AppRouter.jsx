// src/router/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Students from "../Pages/Students";
import Dashboard from "../Pages/Dashboard";
import AddStudent from "../Pages/AddStudent";
import EditStudent from "../Pages/EditStudent";
import Analytics from "../Pages/Analytics";
import NotFound from "../Pages/NotFound";
import Enrollments from "../Pages/Enrollments";
import Attendance  from "../Pages/Attendance";
import StudentDetail from "../components/StudentDetail";
import Home from "../Pages/Home";
import Courses from "../Pages/Courses";

function AppRouter() {
  return (
    <Routes>
      <Route path="/students" element={<Students />} />
      <Route path="/add" element={<AddStudent />} />
      <Route path="/edit/:id" element={<EditStudent />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/addstudent" element = {<AddStudent/>} />
      <Route path="/enrollments" element = {<Enrollments/>} />
      <Route path="/courses" element = {<Courses/>} />
      <Route path="/attendance" element = {<Attendance/>}/>
      <Route path="/view/:id" element={<StudentDetail />} />
    </Routes>
  );
}

export default AppRouter;
