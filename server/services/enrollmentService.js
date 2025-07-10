const enrollmentRepo = require("../repositories/enrollmentRepository");
const logger = require("../utils/logger");

exports.getEnrollments = async () => {
  try {
    const enrollments = await enrollmentRepo.getAll();
    return { status: 200, data: enrollments };
  } catch (err) {
    logger.error("Service error - getEnrollments: " + err.message);
    throw err;
  }
};

exports.createEnrollment = async ({ studentId, courseId, date }) => {
  if (!studentId || !courseId) {
    return { status: 400, data: { error: "Missing student or course ID" } };
  }

  const existing = await enrollmentRepo.findOne({ student: studentId, course: courseId });
  if (existing) {
    return { status: 409, data: { error: "Student already enrolled in this course" } };
  }

  const enrollment = await enrollmentRepo.create({ student: studentId, course: courseId, date });
  return { status: 201, data: enrollment };
};

exports.deleteEnrollmentById = async (id) => {
  const deleted = await enrollmentRepo.deleteById(id);
  if (!deleted) {
    return { status: 404, data: { error: "Enrollment not found" } };
  }
  return { status: 200, data: { message: "Enrollment deleted" } };
};
