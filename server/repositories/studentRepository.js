const Student = require("../models/Studentmodel");

exports.findAll = () => Student.find();

exports.create = (studentData) => Student.create(studentData);

exports.findById = (id) => Student.findOne({ id });

exports.deleteById = (id) => Student.findOneAndDelete({ id });
