const Team = require('../models/Team');


exports.createTeam = async (req, res) => {
    const { name } = req.body;

    
    if (!name) {
        return res.status(400).json({ message: 'Team name is required' });
    }

    try {
        
        const existingTeam = await Team.findOne({ name });
        if (existingTeam) {
            return res.status(400).json({ message: 'Team name already exists' });
        }

        
        const team = await Team.create({ name })

        res.status(201).json(team); 
    } catch (error) {
        console.error('Error creating team:', error.message);
        res.status(500).json({ message: 'Server error' }); 
    }
};





