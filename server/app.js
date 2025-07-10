const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const userRoutes = require("./routes/authRoutes");
const feeRoutes = require("./routes/feeRoutes");
// const api = require("./routes/api");


const app = express();

app.use(cors(""));
app.use(express.json());
app.use("/api/students",studentRoutes);
app.use("/api/attendance",attendanceRoutes);
app.use("/api/courses",courseRoutes);
app.use("/api/enrollments",enrollmentRoutes);
app.use("/api/users",userRoutes);
// app.use("/fees",feeRoutes);
// app.use("/api",api);

app.get("/", (req, res) => {
  res.status(200).send("Backend is running!");
});


module.exports = app;


//read aboout status about 