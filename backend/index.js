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

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

const app = express();
app.use(cors({
  origin: [process.env.CLIENT_URL, 'https://blogit-mkvu.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Register User
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

// Login User
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });

  if (!userDoc) return res.status(400).json('User not found');

  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      }).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('Wrong credentials');
  }
});

// Get Profile
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// Logout
app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

// Create Post with Cloudinary
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: req.file.path, // Use Cloudinary URL
      author: info.id,
    });
    res.json(postDoc);
  });
});

// Get All Posts
app.get('/post', async (req, res) => {
  const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20);
  res.json(posts);
});

// Get Single Post
app.get('/post/:id', async (req, res) => {
  const postDoc = await Post.findById(req.params.id).populate('author', ['username']);
  res.json(postDoc);
});

// Update Post with Cloudinary
app.put('/post/:id', uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null;
  if (req.file) {
    newPath = req.file.path; // Use the Cloudinary URL
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.findById(req.params.id);
    if (!postDoc) return res.status(404).json('Post not found');
    if (postDoc.author.toString() !== info.id) return res.status(403).json('Unauthorized');

    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    if (newPath) postDoc.cover = newPath;

    await postDoc.save();
    res.json(postDoc);
  });
});

// Add Comment
app.post('/comments/:postId', async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) return res.status(401).json('Unauthorized');
    const { content } = req.body;
    const comment = await Comment.create({ content, author: info.id, post: req.params.postId });
    await comment.populate('author', ['username']);
    res.json(comment);
  });
});

// Get Comments
app.get('/comments/:postId', async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate('author', ['username']).sort({ createdAt: -1 });
  res.json(comments);
});

// Like Post
app.post('/post/:id/like', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json('Post not found');
  post.likes = (post.likes || 0) + 1;
  await post.save();
  res.json({ likes: post.likes });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));