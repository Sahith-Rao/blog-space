const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.create({ 
      content, 
      author: req.userId, 
      post: req.params.postId 
    });
    await comment.populate('author', ['username']);
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', ['username'])
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};