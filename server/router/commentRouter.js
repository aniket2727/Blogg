const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); // Import validationResult

// Import the controllers (correct the function name here)
const { AddCommentOnPost, DeleteCommentOnPost, GetAllCommentsByPostId } = require('../controller/commentOnPostController');

// Define the routes
router.post('/addcomment', AddCommentOnPost);
router.post('/deletecomment', DeleteCommentOnPost);

// Route for getting all comments by post ID with validation
router.post(
    '/comments',
    body('postid').isMongoId().withMessage('Invalid post ID format'),
    async (req, res) => {
        const errors = validationResult(req); // Use validationResult
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Call the correctly named function
        await GetAllCommentsByPostId(req, res);
    }
);

// Export the router
module.exports = router;
