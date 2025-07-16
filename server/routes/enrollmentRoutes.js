const express = require("express");
const { 
  getEnrollments, 
  createEnrollment, 
  deleteEnrollmentById 
} = require("../controllers/enrollmentcontroller");

function EnrollmentRoutes() {
  const router = express.Router();

  // console.log("EnrollmentRoutes initialized");

  router.get("/get", getEnrollments);
  router.post("/create", createEnrollment);
  router.delete("/delete/:id", deleteEnrollmentById);

  return router;
}

module.exports = EnrollmentRoutes;
