const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    emotion: {
        type: [String],
        required: true
    },
    file: {
        type: String,
        required: true
    },
    taken_at: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;