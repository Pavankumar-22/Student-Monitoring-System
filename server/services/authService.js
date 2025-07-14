const jwt = require("jsonwebtoken");
const authRepo = require("../repositories/authRepository");
const logger = require("../utils/logger");

exports.getAllUsers = async () => {
  return await authRepo.getAllUsers();
};

exports.register = async (data) => {
  const existing = await authRepo.findUserByUsername(data.username);
  if (existing) throw new Error("Username already exists");
  const user = await authRepo.createUser(data);
  logger.info(`User registered: ${user.username}`);
  return user;
};
exports.login = async (username, password, role) => {
  const user = await authRepo.findUserByUsername(username);
  console.log("Login inputs:", { username, password, role });
  console.log("Found user:", user);

  if (!user) {
    console.log("User not found");
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.matchPassword(password);
  console.log("Password match result:", isMatch);
  // console.log("Type of matchPassword:", typeof user.matchPassword); 


  if (!isMatch) {
    logger.warn(` Invalid password for username: ${username}`);
    throw new Error("Invalid credentials");
  }

  if (user.role !== role) {
    logger.warn(`Role mismatch: expected=${role}, actual=${user.role}`);
    throw new Error("Role mismatch");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  logger.info(`✅ User logged in: ${user.username}`);
  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};
