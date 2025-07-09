const Enrollment = require('../models/Enrollment');

exports.getEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find().populate('student course');
  res.json(enrollments);
};

exports.createEnrollment = async (req, res) => {
  try {
    const { studentId, courseId, date } = req.body;
    if (!studentId || !courseId) {
        return res.status(400).json({ error: 'Missing student or course ID' });
    }
    const enrollment = await Enrollment.create({ studentId, courseId, date });
    const exists = await Enrollment.findOne({ student, course });
        if (exists) return res.status(409).json({ error: 'Already enrolled' });
        }
        catch (err){
            res.status(400).json({ error: err.message });
        }
};

exports.deleteEnrollmentById = async (req, res) => {
  const { id } = req.params;
  const deleted = await Enrollment.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Enrollment not found' });
  res.json({ message: 'Enrollment deleted' });
};