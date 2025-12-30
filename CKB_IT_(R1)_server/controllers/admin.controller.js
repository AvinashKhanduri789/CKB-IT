const adminModel = require('../models/admin');

exports.login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const admin = await adminModel.findOne({ name });

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    if (admin.password !== password) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
