const studentRoutes = require("./studentRoutes");
const attendanceRoutes = require("./attendanceRoutes");
const courseRoutes = require("./courseRoutes");
const enrollmentRoutes = require("./enrollmentRoutes");
// const feeRoutes = require("./FeeRoutes");
const authRoutes = require("./authRoutes");

function registerRoutes(router) {
  router.use("/students", studentRoutes);
  router.use("/attendance", attendanceRoutes);
  router.use("/courses", courseRoutes);
  router.use("/enrollments", enrollmentRoutes);
//   router.use("/fees", feeRoutes);
  router.use("/users", authRoutes);
}

module.exports = registerRoutes;
