const Question = require('../models/Question');
const Team = require('../models/Team'); // Import the Team model
const axios = require('axios');



// Get all questions
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();

        const safeQuestions = questions.map(q => ({
            _id: q._id,
            text: q.text,
            difficulty: q.difficulty,
            maxScore: q.maxScore,
            createdAt: q.createdAt,
            testCases: q.testCases
                .filter(tc => tc.isPublic)
                .map(tc => ({
                    input: tc.input,
                    expectedOutput: tc.expectedOutput,
                    isPublic: tc.isPublic
                }))
        }));

        res.status(200).json(safeQuestions);
    } catch (error) {
        console.error('Error fetching questions:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Submit answer function
exports.submitAnswer = async (req, res) => {
    const questionNumber = req.params.questionNumber;
    const { code, language, teamName, submissionTime, questionId } = req.body;

    console.log("sumit asnswer controller hit-->", code, language, teamName, submissionTime, questionId, questionNumber)

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

    try {
        const [team, question] = await Promise.all([
            Team.findOne({ name: teamName }),
            Question.findOne({ _id: questionId })

        ]);

        const questionKey = `question${questionNumber}`;

        if (team.marksAwarded[questionKey]) {
            return res.status(409).json({
                message: `Submission already exists for ${questionKey}. Resubmission is not allowed.`
            });
        }

        if (!team) return res.status(404).json({ message: 'Team not found' });
        if (!question) return res.status(404).json({ message: 'Question not found' });

        const testCases = question.testCases;
        const totalCases = testCases.length;
        const scorePerCase = question.maxScore / totalCases;

        let passedCount = 0;
        let testCaseResults = [];

        for (let i = 0; i < totalCases; i++) {
            const tc = testCases[i];
            const normalizedInput = tc.input.replace(/\\n/g, '\n');

            const response = await axios.post(pistonUrl, {
                language: pistonLanguage,
                version: languageVersions[pistonLanguage],
                files: [{ name: `main.${getFileExtension(pistonLanguage)}`, content: code }],
                stdin: normalizedInput
            });

            const rawActual = response.data?.run?.output || '';
            const rawExpected = tc.expectedOutput || '';

            const actual = normalize(rawActual);
            const expected = normalize(rawExpected);

            const passed = actual === expected;

            if (passed) passedCount++;

            testCaseResults.push({
                index: i + 1,
                input: tc.input,
                expectedOutput: tc.expectedOutput,
                actualOutput: actual,
                passed,
                executedAt: new Date()
            });
        }

        const scoreAwarded = Math.floor(passedCount * scorePerCase);

        const updateData = {
            $set: {
                [`marksAwarded.question${questionNumber}`]: true,
                [`code.question${questionNumber}`]: code,
                [`timeTaken.question${questionNumber}`]: submissionTime ? new Date(submissionTime) : new Date(),
                [`questionResults.question${questionNumber}`]: {
                    passedCount,
                    totalCases,
                    scoreAwarded,
                    testCaseResults
                }
            }
        };

        if (!team.marksAwarded[`question${questionNumber}`]) {
            updateData.$inc = { [`scoreQuestion${questionNumber}`]: scoreAwarded };
        }

        await Team.findOneAndUpdate({ name: teamName }, updateData);

        return res.status(200).json({
            message: `${passedCount}/${totalCases} test cases passed`,
            scoreAdded: scoreAwarded,
            details: testCaseResults
        });

    } catch (error) {
        console.error('Execution error:', error.message);
        return res.status(500).json({ message: 'Execution error', details: error.message });
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


exports.statusUpdate = async (req, res) => {
    const questionNumber = req.params.questionNumber;
    const { teamName, code, submissionTime } = req.body;

    try {
        await Team.findOneAndUpdate(
            { name: teamName },
            {
                $set: {
                    [`marksAwarded.question${questionNumber}`]: true,
                    [`timeTaken.question${questionNumber}`]: submissionTime ? new Date(submissionTime) : new Date(), // Use submissionTime if provided
                    [`code.question${questionNumber}`]: code
                }
            }
        );
        res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
        console.error('Status update error:', error);
        res.status(500).json({ message: 'Server error during status update', details: error.message });
    }
};

function normalize(str = '') {
    return str
        .replace(/\\n/g, '\n')
        .replace(/\r\n/g, '\n')
        .replace(/[ \t]+$/gm, '')
        .trim();
}


