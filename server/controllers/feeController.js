const Fee = require('../models/Fee');

exports.getFeeStatus = async (req, res) => {
  const fees = await Fee.find().populate('student');
  res.json(fees);
};

exports.recordFee = async (req, res) => {
  try {
    const { student, amount, status, dueDate } = req.body;
    const fee = await Fee.create({ student, amount, status, dueDate });
    res.status(201).json(fee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteFeeById = async (req, res) => {
  const { id } = req.params;
  const deleted = await Fee.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Fee record not found' });
  res.json({ message: 'Fee deleted' });
};