const Student = require("../models/Studentmodel");

// to get all the details of the students
exports.getStudents = async(req,res)=>{
    const students = await Student.find();
    res.json(students);
};


//to add new student into the db

exports.createStudent = async (req, res) => {
  try {
    const { id, name, age, Mobile } = req.body;
    if (!id || !name || !age || !Mobile) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const student = await Student.create({ id, name, age, Mobile });
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Student.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single student by MongoDB _id (not studentid)
exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findOne({id});
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};