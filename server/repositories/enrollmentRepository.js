const Enrollment = require("../models/Enrollment");

exports.getAll = () => Enrollment.find().populate("student course");

exports.findOne = (filter) => Enrollment.findOne(filter);

exports.create = (data) => Enrollment.create(data);

exports.deleteById = (id) => Enrollment.findByIdAndDelete(id);
