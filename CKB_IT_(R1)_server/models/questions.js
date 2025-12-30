const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: Number,
  question: { type: String, required: true },
  answer: { type: Number, required: true },
  options: [{ type: String, required: true }]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
