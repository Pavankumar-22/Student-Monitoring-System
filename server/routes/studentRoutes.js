const express = require("express");
const router = express.Router();
const {getStudents,createStudent,deleteStudentById,getStudentById} = require("../controllers/studentcontrollers");
// const { getStudentById } = require("../../client/src/services/studentAPI");

router.get("/", getStudents);
router.post("/", createStudent);
router.delete("/:id", deleteStudentById);
router.get("/:id",getStudentById);

module.exports = router;
