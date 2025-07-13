const express = require("express");
const registerRoutes = require("./routeLoader");

function loadAllRoutes() {
  const router = express.Router();
  registerRoutes(router); // 🔁 delegate to loader
  return router;
}

module.exports = loadAllRoutes;
