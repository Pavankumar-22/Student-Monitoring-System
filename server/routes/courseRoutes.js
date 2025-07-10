const express = require("express");
const router = express.Router();
const {getCourses,createCourse,deleteCourseByCode,} = require("../controllers/coursecontroller"); // fixed filename casing

router.get("/", getCourses);
router.post("/create/", createCourse);
router.delete("/delete/:code", deleteCourseByCode);

module.exports = router;
