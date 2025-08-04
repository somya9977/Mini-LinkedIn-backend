const express = require('express');
const router = express.Router();
const { getPosts, createPost, getUserPosts } = require('../controllers/postController');
const auth = require('../middleware/auth');

router.get('/', getPosts);
router.post('/', auth, createPost);
router.get('/user/:id', auth, getUserPosts);

module.exports = router;
