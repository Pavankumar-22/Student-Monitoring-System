const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username:    { type: String, required: true, unique: true, trim: true },
  email:       { type: String, required: true, unique: true, trim: true },
  password:    { type: String, required: true },
  role:        { type: String, enum: ["admin", "staff"], default: "staff" },
  mobile:      { type: String, default: "" },
  dob:         { type: Date },
  address:     { type: String, default: "" },
  gender:      { type: String, enum: ["male", "female"], default: "male" },
  status:      { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
