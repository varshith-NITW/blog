//used Ai check again
const fs = require('fs');
const Post = require('../models/Post');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');

async function createPost(req, res) {
    try {
        const { title, content } = req.body;
        const imageFile = req.file;

        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required." });
        }

        let imageUrl = null;

        if (imageFile) {
            if (isCloudinaryConfigured) {
                try {
                    const result = await cloudinary.uploader.upload(imageFile.path, {
                        folder: 'blog_posts'
                    });
                    imageUrl = result.secure_url;
                    fs.unlinkSync(imageFile.path);
                } catch (cloudinaryError) {
                    console.error("Cloudinary upload failed, falling back to local storage:", cloudinaryError);
                    imageUrl = `/uploads/${imageFile.filename}`;
                }
            } else {
                imageUrl = `/uploads/${imageFile.filename}`;
            }
        }

        const newPost = new Post({ title, content, imageUrl });
        await newPost.save();

        console.log(`Created Post: ${newPost.title} (ID: ${newPost._id})`);
        res.status(201).json(newPost);

    } catch (error) {
        console.error("Error creating post in controller:", error);
        res.status(500).json({ error: error.message });
    }
}

async function getPosts(req, res) {
    try {
        const { search, page, limit } = req.query;

        const currentPage = parseInt(page, 10) || 1;
        const itemsLimit = parseInt(limit, 10) || 5;

        let query = {};
        if (search) {
            const queryValue = search.trim();
            query = {
                $or: [
                    { title: { $regex: queryValue, $options: 'i' } },
                    { content: { $regex: queryValue, $options: 'i' } }
                ]
            };
        }

        const totalCount = await Post.countDocuments(query);
        const totalPages = Math.ceil(totalCount / itemsLimit) || 1;

        const posts = await Post.find(query)
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * itemsLimit)
            .limit(itemsLimit);

        res.json({
            posts,
            totalCount,
            totalPages,
            currentPage
        });
    } catch (error) {
        console.error("Error fetching posts in controller:", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createPost,
    getPosts
};
