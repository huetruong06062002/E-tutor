const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Use bcrypt instead of bcryptjs
const User = require("../models/User");
const upload = require("../middleware/upload");
const multer = require("multer");

exports.register = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "File upload error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err });
    }

    try {
      const { name, email, password, role, degree, skills, identityInfo } =
        req.body;

      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      const image = req.file ? req.file.path : undefined;

      const newUser = new User({
        name,
        email,
        password,
        role,
        degree,
        skills,
        identityInfo,
        image,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration error:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isValid = await bcrypt.compare(password, user.password);

    console.log("password", password);
    console.log("user.password", user.password);
    console.log("isValid", isValid);

    if (!isValid) {
      console.log("Password does not match");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      degree: user.degree,
      skills: user.skills,
      identityInfo: user.identityInfo,
      image: user.image,
    };

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, user: userData });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.userInfo = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; 

    const user = await User.findById(userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user information', error: error.message });
  }
};