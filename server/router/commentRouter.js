const express = require('express');
const router = express.Router();

// Import the controllers
const { AddCommentOnPost, DeleteCommentOnPost } = require('../controller/commentOnPostController');

// Define the routes
router.post('/addcomment', AddCommentOnPost);
router.post('/deletecomment', DeleteCommentOnPost);

// Export the router
module.exports = router;
