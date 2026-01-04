const questionModel = require("../models/questions");

exports.fetchQuestions = async (req, res) => {
    try {
        const questions = await questionModel.find();
        res.status(200).json({ msg: "Success", data: questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.updateQuestions = async (req, res) => {
    try {
        const {questions} = req.body;        
        const existingQuestions = await questionModel.find({ _id: { $in: questions.map(question => question._id) } });

        await Promise.all(questions.map(async (newQuestion) => {
            const existingQuestion = existingQuestions.find(q => q._id.toString() === newQuestion._id);
            if (existingQuestion) {
                if (existingQuestion.question !== newQuestion.question ||
                    JSON.stringify(existingQuestion.options) !== JSON.stringify(newQuestion.options) ||
                    existingQuestion.answer !== newQuestion.answer) {
                    await questionModel.updateOne({ _id: newQuestion._id }, { $set: newQuestion });
                }
            }
        }));

        res.status(201).json({ msg: "Success", data: "Questions updated successfully" });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
