const enrollmentRepo = require("../repositories/enrollmentRepository");
const Course = require("../models/Course");
const logger = require("../utils/logger");

// 🔁 Helper: Recount active enrollments and update course
const updateCourseEnrollmentCount = async (courseId) => {
  const count = await enrollmentRepo.count({
    course: courseId,
    status: { $ne: "dropped" }, // Exclude dropped students
  });

  await Course.findByIdAndUpdate(courseId, { enrolled: count });
};

// 📦 Get all enrollments
exports.getEnrollments = async () => {
  try {
    const enrollments = await enrollmentRepo.getAll();
    return { status: 200, data: enrollments };
  } catch (err) {
    logger.error("Service error - getEnrollments: " + err.message);
    throw err;
  }
};

// ➕ Create a new enrollment
exports.createEnrollment = async ({ studentId, courseId, date }) => {
  if (!studentId || !courseId) {
    return { status: 400, data: { error: "Missing student or course ID" } };
  }

  const existing = await enrollmentRepo.findOne({
    student: studentId,
    course: courseId,
  });

  if (existing) {
    return {
      status: 409,
      data: { error: "Student already enrolled in this course" },
    };
  }

  const enrollment = await enrollmentRepo.create({
    student: studentId,
    course: courseId,
    date,
  });

  // 🛠 Update enrolled count after new enrollment
  await updateCourseEnrollmentCount(courseId);

  return { status: 201, data: enrollment };
};

// ❌ Delete enrollment by ID
exports.deleteEnrollmentById = async (id) => {
  const deleted = await enrollmentRepo.deleteById(id);

  if (!deleted) {
    return { status: 404, data: { error: "Enrollment not found" } };
  }

  // 🛠 Update enrolled count after deletion
  await updateCourseEnrollmentCount(deleted.course);

  return { status: 200, data: { message: "Enrollment deleted" } };
};
