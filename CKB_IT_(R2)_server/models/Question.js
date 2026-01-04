const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  isPublic: { type: Boolean, default: false }
});


const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  maxScore: { type: Number, default: 30 },
  testCases: [testCaseSchema],
  createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;