const User = require('../models/User');
const path = require('path');
const fs = require('fs');

exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const imagePath = path.join(__dirname, '..', user.image);
    console.log("imagePath: " + imagePath);
    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      res.status(404).json({ message: 'Image file not found' });
    }
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
