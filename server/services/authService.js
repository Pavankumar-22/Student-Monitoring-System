const jwt = require("jsonwebtoken");
const authRepo = require("../repositories/authRepository");
const logger = require("../utils/logger");

exports.getAllUsers = async () => {
  return await authRepo.getAllUsers();
};

exports.register = async (data) => {
  const existing = await authRepo.findByUsername(data.username);
  if (existing) throw new Error("Username already exists");
  const user = await authRepo.create(data);
  logger.info(`User registered: ${user.username}`);
  return user;
};

exports.login = async (username, password) => {
  const user = await authRepo.findByUsername(username);
  if (!user || !(await user.matchPassword(password))) {
    logger.warn(`Invalid login for username: ${username}`);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
  logger.info(`User logged in: ${user.username}`);
  return { token, user: { id: user._id, username: user.username, role: user.role } };
};
