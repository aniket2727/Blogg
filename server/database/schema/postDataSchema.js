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
    },
    comments: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Unique ID for each comment
            text: { type: String, required: true }, // Comment text
            author: { type: String }, // Author of the comment
            autherid:{type:String},   // auther id
            timestamp: { type: Date, default: Date.now } // When the comment was added
        }
    ]
});

// Model for schema
const PostData = mongoose.model('PostData', postSchema);

module.exports = PostData;
