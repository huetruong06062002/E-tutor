const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/auth');
const tutorRoutes = require('./routes/tutor');
const reviewRoutes = require('./routes/review');
const adminRoutes = require('./routes/admin');
const coursesRoutes = require('./routes/courses');
const cors = require('cors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', coursesRoutes); 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
