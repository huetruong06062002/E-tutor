const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/auth');
const tutorsRoutes = require('./routes/tutor');
const reviewsRoutes = require('./routes/review');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tutors', tutorsRoutes);
app.use('/api/reviews', reviewsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
