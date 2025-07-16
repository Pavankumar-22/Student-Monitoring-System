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

exports.updateUserById = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
}

exports.deleteUserById = (id) => {
  return User.findByIdAndDelete(id);
};
