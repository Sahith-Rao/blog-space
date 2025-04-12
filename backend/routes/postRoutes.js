const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

router.post('/', authMiddleware.verifyToken, uploadMiddleware.single('file'), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/myposts', authMiddleware.verifyToken, postController.getUserPosts);
router.get('/:id', postController.getPost);
router.put('/:id', authMiddleware.verifyToken, uploadMiddleware.single('file'), postController.updatePost);
router.delete('/:id', authMiddleware.verifyToken, postController.deletePost);

module.exports = router;