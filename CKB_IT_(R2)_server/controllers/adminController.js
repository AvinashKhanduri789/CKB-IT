const Team = require("../models/Team")
const Admin= require("../models/Admin")
const Question = require("../models/Question")


exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find();

    const response = teams.map(team => {
      const totalScore = team.scoreQuestion1 + team.scoreQuestion2 + team.scoreQuestion3;

      const times = Object.values(team.timeTaken).filter(t => t);
      let totalTime = null;
      if (times.length >= 2) {
        const sortedTimes = times.map(t => new Date(t).getTime()).sort();
        totalTime = sortedTimes[sortedTimes.length - 1] - sortedTimes[0];
      }

      return {
        teamName: team.name,
        totalScore,
        totalTime,
        timeStamps: team.timeTaken,
        code: team.code,
        testCaseResults: team.questionResults || null
      };
    });

    response.sort((a, b) => {
      if (b.totalScore === a.totalScore) {
        if (!a.totalTime && !b.totalTime) return 0;
        if (!a.totalTime) return 1;
        if (!b.totalTime) return -1;
        return a.totalTime - b.totalTime;
      }
      return b.totalScore - a.totalScore;
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching teams:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.createQuestion = async (req, res) => {
  try {
    const { text, difficulty, maxScore, testCases } = req.body;

    if (!text || !testCases || testCases.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const question = new Question({
      text,
      difficulty,
      maxScore,
      testCases
    });

    await question.save();

    res.status(201).json({ message: 'Question created successfully', question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating question', error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, difficulty, maxScore, testCases } = req.body;

    const updated = await Question.findByIdAndUpdate(
      id,
      { text, difficulty, maxScore, testCases },
      { new: true, runValidators: true }
    );

    if (!updated) {
      console.log("controll inside !updated condition")
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ message: 'Question updated successfully', question: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Question.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};



