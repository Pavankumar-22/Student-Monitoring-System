const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentcontrollers");

router.get("/", studentController.getAllStudents);
router.post("/create", studentController.createStudent);
router.get("/view/:id", studentController.getStudentById);
router.delete("/delete/:id", studentController.deleteStudentById);

module.exports = router;
