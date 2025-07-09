const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  deleteUserById,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", deleteUserById);

module.exports = router;

//make an account in git push this code there 
//write a service file also all login should be in th service file