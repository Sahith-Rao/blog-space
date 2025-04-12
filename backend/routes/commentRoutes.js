const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:postId', authMiddleware.verifyToken, commentController.createComment);
router.get('/:postId', commentController.getComments);

module.exports = router;