const express = require("express");
const { 
  getCourses, 
  createCourse, 
  deleteCourseByCode 
} = require("../controllers/coursecontroller");

function CourseRoutes() {
  const router = express.Router();

  // console.log("CourseRoutes initialized");

  router.get("/get", getCourses);
  router.post("/create", createCourse);
  router.delete("/delete/:code", deleteCourseByCode);

  return router;
}

module.exports = CourseRoutes;
