const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Middleware for file upload
const upload = require('../middleware/upload'); 

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


// Update profile
exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'File upload error', error: err });
    } else if (err) {
      return res.status(500).json({ message: 'Internal server error', error: err });
    }

    try {
      const { name, email, degree, skills, identityInfo } = req.body;
      const image = req.file ? req.file.path : undefined;

      // Find user by id
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update user fields
      user.name = name || user.name;
      user.email = email || user.email;
      user.degree = degree || user.degree;
      user.skills = skills || user.skills;
      user.identityInfo = identityInfo || user.identityInfo;
      if (image) {
        user.image = image;
      }

      await user.save();
      res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
};


// Change password
exports.changePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    // Find user by id
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare old password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Hash new password and update user
    user.password = bcrypt.hashSync(newPassword, 10);
    await user.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
