const express = require("express");
const router = express.Router();
const {getCourses,createCourse,deleteCourseByCode,} = require("../controllers/coursecontroller");

router.get("/", getCourses);
router.post("/", createCourse);
router.delete("/:code", deleteCourseByCode);

module.exports = router;