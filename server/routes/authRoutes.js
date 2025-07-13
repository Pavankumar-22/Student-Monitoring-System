const express = require("express");
const AuthController = require("../controllers/authController");

class AuthRoutes {
  router = express.Router();
  setRoutes() {
    this.router.get("/", AuthController.getUsers);          
    this.router.post("/register", AuthController.register);
    this.router.post("/login", AuthController.login);
    return this.router;
  }
}

module.exports = new AuthRoutes().setRoutes();
