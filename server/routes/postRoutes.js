const express = require('express');
const router = express.Router();
const { createPost, getPosts } = require('../controllers/postController');
const upload = require('../middleware/upload');

router.post('/', upload.single('image'), createPost);
router.get('/', getPosts);

module.exports = router;
