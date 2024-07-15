const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const upload = require('../middleware/upload'); // Import middleware for file upload
const multer = require('multer');

exports.register = async (req, res) => {
  try {
    // Middleware 'upload' handles the file upload and attaches file information to 'req.file'
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'File upload error', error: err });
      } else if (err) {
        return res.status(500).json({ message: 'Internal server error', error: err });
      }

      // Extract form fields and uploaded file information from 'req.body' and 'req.file'
      const { name, email, password, role, degree, skills, identityInfo } = req.body;
      const image = req.file ? req.file.path : undefined; // Get uploaded file path

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        degree,
        skills,
        identityInfo,
        image, // Save uploaded image path to the database
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Prepare user data to return
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      degree: user.degree,
      skills: user.skills,
      identityInfo: user.identityInfo,
      image: user.image, // Include user's image path if it exists
    };

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token and user data
    res.json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
