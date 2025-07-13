const User = require("../models/User");

// Find user by username (used during login and registration)
exports.findUserByUsername = (username) => {
  return User.findOne({ username });
};

// Create a new user
exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

// Get all users (excluding passwords)
exports.getAllUsers = () => {
  return User.find().select("-password");
};

// Delete a user by ID
exports.deleteUserById = (id) => {
  return User.findByIdAndDelete(id);
};
