const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalScore: { type: Number, default: 0 },
  answers: [{ type: Number }],
  answerTime: [{ type: Number }],
  totalTimeTaken: { type: Number, default: 0 },
  attempted: [{type: Boolean, default: false}]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
