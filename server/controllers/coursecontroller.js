const Course = require('../models/course');

exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

exports.createCourse = async (req, res) => {
  try {
    const { code, title, description } = req.body;
    if (!code || !title) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const course = await Course.create({ code, title, description });
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCourseByCode = async (req, res) => {
  const { code } = req.params;
  const deleted = await Course.findOneAndDelete({ code });
  if (!deleted) return res.status(404).json({ error: 'Course not found' });
  res.json({ message: 'Course deleted' });
};

//update the file names and controller should also updated
