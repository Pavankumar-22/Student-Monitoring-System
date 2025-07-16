const express = require("express");
const AuthController = require("../controllers/authController");

function AuthRoutes() {
  const router = express.Router();

  // console.log("AuthRoutes initialized");

  router.get("/", AuthController.getUsers);
  router.post("/register", AuthController.register);
  router.post("/login", AuthController.login);

  return router;
}

module.exports = AuthRoutes;
