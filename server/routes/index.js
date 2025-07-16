const express = require("express");
const registerRoutes = require("./routeLoader");

function loadAllRoutes() {
  const router = express.Router();
  registerRoutes(router);
  return router;
}

module.exports = loadAllRoutes;
