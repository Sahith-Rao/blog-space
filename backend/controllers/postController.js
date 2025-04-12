const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.createPost = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  const { title, summary, content } = req.body;
  try {
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: req.file.path,
      author: req.userId,
    });
    res.json(postDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const postDoc = await Post.findById(req.params.id).populate('author', ['username']);
    if (!postDoc) return res.status(404).json({ error: 'Post not found' });
    res.json(postDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

exports.updatePost = async (req, res) => {
  let newPath = req.file ? req.file.path : null;
  try {
    const { title, summary, content } = req.body;
    const postDoc = await Post.findById(req.params.id);
    if (!postDoc) return res.status(404).json({ error: 'Post not found' });

    if (postDoc.author.toString() !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

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
};

exports.getUserPosts = async (req, res) => {
    try {
      const posts = await Post.find({ author: req.userId })
        .populate('author', ['username'])
        .sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts', details: error.message });
    }
  };

exports.deletePost = async (req, res) => {
  try {
    const postDoc = await Post.findById(req.params.id);
    if (!postDoc) return res.status(404).json({ error: 'Post not found' });

    if (postDoc.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Comment.deleteMany({ post: req.params.id });
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};