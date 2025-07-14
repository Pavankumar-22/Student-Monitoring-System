const User = require("../models/User");

exports.findUserByUsername = (username) => {
  return User.findOne({ username });
};

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.getAllUsers = () => {
  return User.find().select("-password");
};

exports.deleteUserById = (id) => {
  return User.findByIdAndDelete(id);
};
