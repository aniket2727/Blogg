const mongoose = require('mongoose');

// Schema for post data
const postSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true  // Corrected from 'require' to 'required'
    },
    postContent: {
        type: String,
        required: true  // Corrected from 'require' to 'required'
    }
});

// Model for schema
const postDataModel = mongoose.model('postdata', postSchema);

module.exports = { postDataModel };
