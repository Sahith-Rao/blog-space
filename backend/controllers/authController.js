const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { username, password } = req.body;
  
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }
  if (!/[A-Z]/.test(password) && !/\d/.test(password)) {
    return res.status(400).json({ error: 'Password must contain at least one uppercase letter or number' });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userDoc = await User.create({ username, password: hashedPassword });
    res.status(200).json(userDoc);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
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
        secure: true, 
        sameSite: 'none', 
      }).json({ id: userDoc._id, username });
    });
  } else {
    res.status(400).json({ error: 'Wrong credentials' });
  }
};

exports.profile = (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, {}, (err, info) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    res.json(info);
  });
};

exports.logout = (req, res) => {
  res.cookie('token', '', { httpOnly: true, secure: true, sameSite: 'none' }).json({ message: 'Logged out' });
};