const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
}, 
{ timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
