const studentRepository = require("../repositories/studentRepository");
const logger = require("../utils/logger");

exports.getAllStudents = async () => {
  const students = await studentRepository.findAll();
  return { status: 200, data: students };
};

exports.createStudent = async (payload) => {
  const { id, name, age, Mobile } = payload;
  if (!id || !name || !age || !Mobile) {
    return { status: 400, data: { error: "Missing required fields" } };
  }
  try {
    const student = await studentRepository.create({ id, name, age, Mobile });
    logger.info(`Student saved to DB with id:${student.id}`)
    return { status: 201, data: student };
  } catch (err) {
    return { status: 500, data: { error: err.message } };
  }
};

exports.getStudentById = async (id) => {
  try {
    const student = await studentRepository.findById(id);
    if (!student) return { status: 404, data: { error: "Student not found" } };
    return { status: 200, data: student };
  } catch (err) {
    return { status: 500, data: { error: err.message } };
  }
};

exports.deleteStudentById = async (id) => {
  try {
    const deleted = await studentRepository.deleteById(id);
    if (!deleted) return { status: 404, data: { error: "Student not found" } };
    return { status: 200, data: { message: "Student deleted successfully" } };
  } catch (err) {
    return { status: 500, data: { error: err.message } };
  }
};

//if you have multiple function try to write in class structure
