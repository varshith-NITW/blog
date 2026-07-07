const fs = require('fs');
const Post = require('../models/Post');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');

async function createPost(req, res) {
    try {
        const { title, content } = req.body;
        const file = req.file;

        if (!title || !content) return res.status(400).json({ error: "Title and content required." });

        let imageUrl = null;
        if (file) {
            if (isCloudinaryConfigured) {
                try {
                    const result = await cloudinary.uploader.upload(file.path, { folder: 'blog_posts' });
                    imageUrl = result.secure_url;
                    fs.unlinkSync(file.path);
                } catch (err) {
                    imageUrl = `/uploads/${file.filename}`;
                }
            } else {
                imageUrl = `/uploads/${file.filename}`;
            }
        }

        const post = new Post({ title, content, imageUrl });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getPosts(req, res) {
    try {
        const { search, page = 1, limit = 5 } = req.query;
        const p = parseInt(page, 10);
        const l = parseInt(limit, 10);

        let query = {};
        if (search) {
            const rx = { $regex: search.trim(), $options: 'i' };
            query = { $or: [{ title: rx }, { content: rx }] };
        }

        const totalCount = await Post.countDocuments(query);
        const posts = await Post.find(query).sort({ createdAt: -1 }).skip((p - 1) * l).limit(l);

        res.json({ posts, totalCount, totalPages: Math.ceil(totalCount / l) || 1, currentPage: p });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createPost, getPosts };
