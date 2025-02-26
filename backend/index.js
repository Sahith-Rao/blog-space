require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const uploadMiddleware = require('./cloudinary'); // Import Cloudinary upload middleware

const app = express();

// Load environment variables
const CLIENT_URL = process.env.CLIENT_URL || 'https://blogspace-bay.vercel.app';
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 4000;

// CORS Configuration
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:3000'], // Allow frontend and localhost
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Register User
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userDoc = await User.create({ username, password: hashedPassword });
    res.json(userDoc);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Registration failed' });
  }
});

// Login User
app.post('/login', async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });

  if (!userDoc) return res.status(400).json({ error: 'User not found' });

  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, JWT_SECRET, {}, (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Login failed' });
      }
      res.cookie('token', token, {
        httpOnly: true,
        secure: true, // Ensure secure cookies in production
        sameSite: 'none', // Required for cross-origin cookies
      }).json({ id: userDoc._id, username });
    });
  } else {
    res.status(400).json({ error: 'Wrong credentials' });
  }
});

// Get Profile
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, {}, (err, info) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    res.json(info);
  });
});

// Logout
app.post('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true, secure: true, sameSite: 'none' }).json({ message: 'Logged out' });
});

// Create Post with Cloudinary
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });

    const { title, summary, content } = req.body;
    try {
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: req.file.path, // Cloudinary URL
        author: info.id,
      });
      res.json(postDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  });
});

// Get All Posts
app.get('/post', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get Single Post
app.get('/post/:id', async (req, res) => {
  try {
    const postDoc = await Post.findById(req.params.id).populate('author', ['username']);
    if (!postDoc) return res.status(404).json({ error: 'Post not found' });
    res.json(postDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Update Post
app.put('/post/:id', uploadMiddleware.single('file'), async (req, res) => {
  let newPath = req.file ? req.file.path : null;
  const { token } = req.cookies;

  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const { title, summary, content } = req.body;
      const postDoc = await Post.findById(req.params.id);
      if (!postDoc) return res.status(404).json({ error: 'Post not found' });

      if (postDoc.author.toString() !== info.id) return res.status(403).json({ error: 'Unauthorized' });

      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      if (newPath) postDoc.cover = newPath;

      await postDoc.save();
      res.json(postDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  });
});

// Add Comment
app.post('/comments/:postId', async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const { content } = req.body;
      const comment = await Comment.create({ content, author: info.id, post: req.params.postId });
      await comment.populate('author', ['username']);
      res.json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add comment' });
    }
  });
});

// Get Comments
app.get('/comments/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author', ['username']).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Like Post
app.post('/post/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.likes = (post.likes || 0) + 1;
    await post.save();
    res.json({ likes: post.likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));