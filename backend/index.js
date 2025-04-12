require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'https://blogspace-bay.vercel.app';
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/', authRoutes);
app.use('/post', postRoutes);
app.use('/comments', commentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));