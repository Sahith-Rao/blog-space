// models/Post.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: { type: Number, default: 0 } // Added likes field with default value
}, {
    timestamps: true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;
