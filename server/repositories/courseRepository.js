const Course = require('../models/course');

exports.findAll = async () => {
  return await Course.find();
};

exports.findByCode = async (code) => {
  return await Course.findOne({ code });
};

exports.create = async (data) => {
  return await Course.create(data);
};

exports.deleteByCode = async (code) => {
  return await Course.findOneAndDelete({ code });
};
