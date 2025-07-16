const StudentRoutes = require("./studentRoutes");
const AttendanceRoutes = require("./attendanceRoutes");
const CourseRoutes = require("./courseRoutes");
const EnrollmentRoutes = require("./enrollmentRoutes");
// const FeeRoutes = require("./feeRoutes"); 
const AuthRoutes = require("./authRoutes");

function registerRoutes(router) {
  console.log("📦 Registering all routes...");

  router.use("/students", StudentRoutes());
  router.use("/attendance", AttendanceRoutes());
  router.use("/courses", CourseRoutes());
  router.use("/enrollments", EnrollmentRoutes());
  // router.use("/fees", FeeRoutes()); // optional
  router.use("/users", AuthRoutes());
}

module.exports = registerRoutes;
