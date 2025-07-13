const express = require("express");
const { getEnrollments,createEnrollment,deleteEnrollmentById } = require("../controllers/enrollmentcontroller");

class EnrollmentRoutes {
  router = express.Router();

  setRoutes() {
    this.router.get("/get", getEnrollments);
    this.router.post("/create", createEnrollment);
    this.router.delete("/delete/:id", deleteEnrollmentById);
    return this.router;
  }
}

module.exports = new EnrollmentRoutes().setRoutes();
