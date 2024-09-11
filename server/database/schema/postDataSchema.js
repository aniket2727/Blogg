const mongoose = require('mongoose');

// Schema for post data
const postSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    postContent: {
        type: String,
        required: true
    }
});

// Model for schema
const PostData = mongoose.model('PostData', postSchema);

module.exports = PostData;
