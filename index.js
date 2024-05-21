const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Post = require('./Post');

mongoose.connect(process.env.MONGO_URI) .then(() => { console.log('Connected to MongoDB'); }) .catch((error) => { console.error('Failed to connect to MongoDB:', error); });

const app = express();
app.use(cors());

app.use(express.json({ limit: '100mb' }));

app.get('/feeds', async (req, res) => {

    const posts = await Post.find();

    console.log(posts);
    res.json({posts});

    /*
    const { next } = req.query;
    console.log(next);
    const response = await client.feeds.fetch(next ? next : undefined);
    console.log(response);
    if (response.message == "login_required") return res.status(401).json({ message: "Login required" });
    if (!response.items?.length) return res.json({ next: null, posts: [] });
    const posts = [];

    for (let i = 0; i < response.items.length; i++) {
        if (!response.items[i].thread_items) continue;

        const { post } = response.items[i].thread_items[0];
        console.log(post);
        const formattedPost = {}

        if (post.image_versions2?.candidates && post.image_versions2.candidates.length > 0) {
            const image = post.image_versions2.candidates[0].url;
            const response = await fetch(image);
            const buffer = await response.arrayBuffer();
            const imageBase64 = Buffer.from(buffer).toString('base64');
            formattedPost.image = `data:image/jpeg;base64,${imageBase64}`;
        }


        const userPic = post.user.profile_pic_url;
        const res = await fetch(userPic);
        const buffer = await res.arrayBuffer();
        const userPicBase64 = Buffer.from(buffer).toString('base64');
        formattedPost.userPic = `data:image/jpeg;base64,${userPicBase64}`;

        const emotion = ""
        posts.push({
            ...post,
            ...formattedPost,
            caption: post.caption?.text,
            media: post.media,
            likes: post.like_count,
            comments: post.comment_count,
            timestamp: post.timestamp,
            emotion,
        });
    }


    res.json({
        next: response.next_max_id,
        posts
    });
    */
});

app.post('/post', async (req, res) => {
    const { caption, emotion, file } = req.body;

    const post = new Post({
        caption,
        emotion,
        file
    });

    const savedPost = await post.save();

    res.json(savedPost);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});