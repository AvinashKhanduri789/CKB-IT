const Team = require('../models/Team');

// Create a new team
exports.createTeam = async (req, res) => {
    const { name } = req.body;

    // Validate input
    if (!name) {
        return res.status(400).json({ message: 'Team name is required' });
    }

    try {
        // Check if the team already exists
        const existingTeam = await Team.findOne({ name });
        if (existingTeam) {
            return res.status(400).json({ message: 'Team name already exists' });
        }

        // Create a new team instance
        const team = await Team.create({ name })

        res.status(201).json(team); // Respond with the created team
    } catch (error) {
        console.error('Error creating team:', error.message);
        res.status(500).json({ message: 'Server error' }); // Handle server errors
    }
};

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find();

        // Map through teams to create a response with teamName, totalScore, and totalTime
        const response = teams.map(team => {
            const totalScore = team.scoreQuestion1 + team.scoreQuestion2 + team.scoreQuestion3;

            // Calculate total time taken (from first to last submission)
            const times = Object.values(team.timeTaken).filter(t => t);
            
            let totalTime = null;
            if (times.length >= 2) {
                const sortedTimes = times.map(t => new Date(t).getTime()).sort();
                totalTime = sortedTimes[sortedTimes.length - 1] - sortedTimes[0]; // last - first
            }

            return {
                teamName: team.name,
                totalScore: totalScore,
                totalTime: totalTime, // time in milliseconds from first to last submission
                timeStamps: team.timeTaken,
                code: team.code,
            };
        });

        // Sort: first by totalScore descending, then by totalTime ascending (faster teams first)
        response.sort((a, b) => {
            if (b.totalScore === a.totalScore) {
                // Both teams have same score
                if (!a.totalTime && !b.totalTime) return 0; // both have no time data
                if (!a.totalTime) return 1; // team A has no time data, put it last
                if (!b.totalTime) return -1; // team B has no time data, put it last
                return a.totalTime - b.totalTime; // ascending order (shorter time first)
            }
            return b.totalScore - a.totalScore; // descending order by score
        });

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching teams:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};