const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const userRoutes = require("./routes/userRoutes");
const feeRoutes = require("./routes/feeRoutes");
// const api = require("./routes/api");


const app = express();

app.use(cors("*"));
app.use(express.json());
app.use("/students",studentRoutes);
app.use("/attendance",attendanceRoutes);
app.use("/courses",courseRoutes);
app.use("/enrollments",enrollmentRoutes);
app.use("/users",userRoutes);
// app.use("/fees",feeRoutes);
// app.use("/api",api);

app.get("/", (req, res) => {
  res.status(200).send("Backend is running!");
});


module.exports = app;


//read aboout status about 