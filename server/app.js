const express = require("express");
const cors = require("cors");
const loadAllRoutes = require("./routes");

const app = express();

// Middleware
app.use(cors("*"));
app.use(express.json());

// Routes
app.use("/api", loadAllRoutes());

app.get("/", (req, res) => {
  res.status(200).send("Backend is running!");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
})

module.exports = app;
