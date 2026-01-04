const mongoose = require('mongoose');

const testCaseResultSchema = new mongoose.Schema({
  index: Number,
  input: String,
  expectedOutput: String,
  actualOutput: String,
  passed: Boolean,
  executedAt: { type: Date, default: Date.now }
}, { _id: false });

const questionResultSchema = new mongoose.Schema({
    passedCount: { type: Number, default: 0 },
    totalCases: { type: Number, default: 0 },
    scoreAwarded: { type: Number, default: 0 },
    testCaseResults: [testCaseResultSchema]
}, { _id: false });

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },

    scoreQuestion1: { type: Number, default: 0 },
    scoreQuestion2: { type: Number, default: 0 },
    scoreQuestion3: { type: Number, default: 0 },

    marksAwarded: {
        question1: { type: Boolean, default: false },
        question2: { type: Boolean, default: false },
        question3: { type: Boolean, default: false },
    },

    timeTaken: {
        question1: { type: Date, default: null },
        question2: { type: Date, default: null },
        question3: { type: Date, default: null },
    },

    code: {
        question1: { type: String, default: '' },
        question2: { type: String, default: '' },
        question3: { type: String, default: '' },
    },

    questionResults: {
        question1: questionResultSchema,
        question2: questionResultSchema,
        question3: questionResultSchema
    }

}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
