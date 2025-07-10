const courseRepo = require('../repositories/courseRepository');

exports.getAllCourses = async () => {
  const courses = await courseRepo.findAll();
  return { status: 200, data: courses };
};

exports.createCourse = async (data) => {
  const { code, name } = data;

  if (!code || !name) {
    return { status: 400, data: { error: 'Code and Name are required' } };
  }

  const exists = await courseRepo.findByCode(code);
  if (exists) {
    return { status: 409, data: { error: 'Course code already exists' } };
  }

  const newCourse = await courseRepo.create(data);
  return { status: 201, data: newCourse };
};

exports.deleteCourseByCode = async (code) => {
  const deleted = await courseRepo.deleteByCode(code);
  if (!deleted) {
    return { status: 404, data: { error: 'Course not found' } };
  }
  return { status: 200, data: { message: 'Course deleted successfully' } };
};
