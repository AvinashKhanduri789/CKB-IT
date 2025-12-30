const Question = require('../models/Question');
const Team = require('../models/Team'); // Import the Team model
const axios = require('axios');

// Hardcoded test inputs and expected outputs for each question
const testCases = {
    '1': {
        input: '6\n12 9 4 6 3 7',
        expectedOutput: '72\n'
    },
    '2': {
        input: '3\n1 10 9\n7 -7 7\n20 31 1',
        expectedOutput: '-1\n1\n-1\n'
    },
    '3': {
        input: '7 5 2 10 3\n6 6 6 6 6 6 6',
        expectedOutput: '12\n'
    },
};

// Get all questions
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Submit answer function
exports.submitAnswer = async (req, res) => {
    const questionNumber = req.params.questionNumber;
    const { code, language, teamName, submissionTime } = req.body; // Added submissionTime

    const pistonUrl = 'https://emkc.org/api/v2/piston/execute';
    const languageVersions = {
        python: '3.10.0',
        c: '10.2.0',
        cpp: '10.2.0',
        java: '15.0.2',
        javascript: '18.15.0'
    };

    const pistonLanguage = language?.toLowerCase();
    if (!languageVersions[pistonLanguage]) {
        return res.status(400).json({ message: 'Unsupported language' });
    }

    if (!teamName || !language) {
        return res.status(400).json({ message: 'Language and teamName are required' });
    }

    const testCase = testCases[questionNumber];
    if (!testCase) {
        return res.status(400).json({ message: 'Invalid question number' });
    }

    try {
        const team = await Team.findOne({ name: teamName });
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        // Execute code using Piston API
        const response = await axios.post(pistonUrl, {
            language: pistonLanguage,
            version: languageVersions[pistonLanguage],
            files: [{ name: `main.${getFileExtension(pistonLanguage)}`, content: code }],
            stdin: testCase.input
        });

        let actualOutput = response.data?.run?.output?.trim() || '';
        let passed = actualOutput === testCase.expectedOutput.trim();
        let score = 0;

        // Only award score if passed and marks not already given
        if (passed && !team.marksAwarded[`question${questionNumber}`]) {
            if (questionNumber === '1') score = 30;
            if (questionNumber === '2') score = 30;
            if (questionNumber === '3') score = 30;
        }

        // Build update object
        const updateData = {
            $set: {
                [`marksAwarded.question${questionNumber}`]: passed ? true : team.marksAwarded[`question${questionNumber}`] || false,
                [`code.question${questionNumber}`]: code,
                [`timeTaken.question${questionNumber}`]: submissionTime ? new Date(submissionTime) : new Date() // Use submissionTime if provided
            }
        };

        if (score > 0) {
            updateData.$inc = { [`scoreQuestion${questionNumber}`]: score };
        }

        await Team.findOneAndUpdate({ name: teamName }, updateData, { new: true });

        return res.status(200).json({
            message: passed ? 'Code executed successfully and marks added' : 'Code executed but output did not match',
            output: actualOutput,
            scoreAdded: score
        });

    } catch (error) {
        console.error('Error executing code:', error.message);
        if (error.response) {
            return res.status(error.response.status).json({ message: 'Error from Piston API', details: error.response.data });
        } else if (error.request) {
            return res.status(500).json({ message: 'No response from Piston API', details: error.message });
        } else {
            return res.status(500).json({ message: 'Server error while executing code', details: error.message });
        }
    }
};

// Get file extension for code execution
function getFileExtension(language) {
    switch (language.toLowerCase()) {
        case 'c': return 'c';
        case 'cpp': return 'cpp';
        case 'java': return 'java';
        case 'python': return 'py';
        case 'javascript': return 'js';
        default: throw new Error('Unsupported language');
    }
}

// Optional: update marks/time without running code
exports.statusUpdate = async (req, res) => {
    const questionNumber = req.params.questionNumber;
    const { teamName, code, submissionTime } = req.body; // Added submissionTime

    try {
        await Team.findOneAndUpdate(
            { name: teamName },
            { $set: {
                [`marksAwarded.question${questionNumber}`]: true,
                [`timeTaken.question${questionNumber}`]: submissionTime ? new Date(submissionTime) : new Date(), // Use submissionTime if provided
                [`code.question${questionNumber}`]: code
            }}
        );
        res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
        console.error('Status update error:', error);
        res.status(500).json({ message: 'Server error during status update', details: error.message });
    }
};
