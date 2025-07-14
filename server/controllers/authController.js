const authService = require("../services/authService");

exports.getUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const result = await authService.login(username, password, role);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
