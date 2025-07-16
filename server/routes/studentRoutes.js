const express = require("express");
const StudentController = require("../controllers/studentcontrollers");

function StudentRoutes() {
  const router = express.Router(); 

  // console.log("StudentRoutes initialized");
  router.get("/get", StudentController.getAllStudents);
  router.post("/create", StudentController.createStudent);
  router.get("/get/:id", StudentController.getStudentById);
  router.delete("/delete/:id", StudentController.deleteStudentById);

  return router;
}

module.exports = StudentRoutes;
