const express = require("express");
const router = express.Router();
const {
  getFeeStatus,
  recordFee,
  deleteFeeById,
} = require("../controllers/feeController");

router.get("/", getFeeStatus);
router.post("/", recordFee);
router.delete("/:id", deleteFeeById);

module.exports = router;