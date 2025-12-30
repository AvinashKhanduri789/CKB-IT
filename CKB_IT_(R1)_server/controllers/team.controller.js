const teamModel = require('../models/teams');

exports.storeData = async (req, res) => {
  try {
    const newTeam = await teamModel.create(req.body);
    res.status(201).json({ success: true, data: newTeam });
  } catch (error) {
    console.error('Error storing team data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.fetchData = async (req, res) => {
    try {
      const teamData = await teamModel.find();
      res.status(200).json({ success: true, data: teamData });
    } catch (error) {
      console.error('Error fetching team data:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  