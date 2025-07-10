const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authRepo = require("../repositories/authRepository");

exports.loginUser = async (username, password) => {
  const user = await authRepo.findUserByUsername(username);
  if (!user || !(await user.matchPassword(password))) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return { user, token };
};

exports.registerUser = async (data) => {
  const existing = await authRepo.findUserByUsername(data.username);
  if (existing) throw new Error("User already exists");
  const hashed = await bcrypt.hash(data.password, 10);
  return await authRepo.createUser({ ...data, password: hashed });
};