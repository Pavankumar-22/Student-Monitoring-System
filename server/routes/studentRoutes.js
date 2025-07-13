const express = require("express");
const StudentController = require("../controllers/studentcontrollers");

class StudentRoutes {
  router = express.Router();

  setRoutes() {
    this.router.get("/", StudentController.getAllStudents);
    this.router.post("/create", StudentController.createStudent);
    this.router.get("/view/:id", StudentController.getStudentById);
    this.router.delete("/delete/:id", StudentController.deleteStudentById);
    return this.router;
  }
}

module.exports = new StudentRoutes().setRoutes();
