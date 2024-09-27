const postdata = require('../database/schema/postDataSchema');
const mongoose = require('mongoose');
const winston = require('winston');
const { getCacheData, setCachedata } = require('../redisClient'); // Using getCacheData and setCachedata

// Logger setup using winston
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console()
    ]
});

// Validate input function
const validateInput = (input) => input && typeof input === 'string' && input.trim() !== '';

// Add comment on post
const AddCommentOnPost = async (req, res) => {
    let { postid, newpostcomment, author, autherid } = req.body;

    // Trim and validate input
    postid = postid ? postid.trim() : '';
    newpostcomment = newpostcomment ? newpostcomment.trim() : '';
    author = author ? author.trim() : 'Anonymous'; // Default to 'Anonymous' if no author provided
    autherid = autherid ? autherid.trim() : '';

    if (!validateInput(postid) || !validateInput(newpostcomment) || !validateInput(autherid)) {
        return res.status(400).json({ message: "Bad request data" });
    }

    try {
        // Find the post by its ID
        const result = await postdata.findById(postid);
        if (result) {
            // Create a new comment object
            const comment = {
                text: newpostcomment,
                author,
                autherid,
            };

            // Push the new comment to the comments array
            result.comments.push(comment);

            // Save the updated post document
            await result.save();

            // Invalidate cache for post comments after adding a comment
            await setCachedata(postid, null);

            res.status(200).json({ message: "Comment added successfully", comment });
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        logger.error(`Error adding comment: ${error.message}`);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Delete comment on post by using IDs
const DeleteCommentOnPost = async (req, res) => {
    let { postid, commentid } = req.body;

    // Trim and validate input
    postid = postid ? postid.trim() : '';
    commentid = commentid ? commentid.trim() : '';

    if (!validateInput(postid) || !validateInput(commentid)) {
        return res.status(400).json({ message: "Bad request data" });
    }

    try {
        // Find the post by its ID
        const result = await postdata.findById(postid);
        if (result) {
            // Find the index of the comment by its _id
            const commentIndex = result.comments.findIndex(comment => comment._id.toString() === commentid);

            if (commentIndex !== -1) {
                // Remove the comment from the comments array
                result.comments.splice(commentIndex, 1);

                // Save the updated post document
                await result.save();

                // Invalidate cache for post comments after deleting a comment
                await setCachedata(postid, null);

                res.status(200).json({ message: "Comment deleted successfully" });
            } else {
                res.status(404).json({ message: "Comment not found" });
            }
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        logger.error(`Error deleting comment: ${error.message}`);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get all comments by post ID with pagination and Redis caching
const GetAllCommentsByPostId = async (req, res) => {
    let { postid } = req.body; // Destructure postid from req.body
    const { limit = 10, page = 1 } = req.query; // Pagination parameters

    // Trim and validate postid
    postid = postid ? postid.trim() : '';

    if (!validateInput(postid) || !mongoose.Types.ObjectId.isValid(postid)) {
        return res.status(400).json({ message: 'Invalid post ID format' });
    }

    try {
        // Check Redis cache using getCacheData
        const cachedComments = await getCacheData(postid);
        if (cachedComments) {
            return res.status(200).json({
                message: 'Comments retrieved from cache',
                comments: JSON.parse(cachedComments)
            });
        }

        // Find the post by ID
        const findPost = await postdata.findById(postid).lean();

        if (findPost) {
            const allComments = findPost.comments;
            if (allComments && allComments.length > 0) {
                // Paginate comments
                const paginatedComments = allComments.slice((page - 1) * limit, page * limit);

                // Cache comments in Redis using setCachedata
                await setCachedata(postid, JSON.stringify(allComments), 'EX', 600); // Cache for 10 minutes

                return res.status(200).json({
                    message: 'Comments retrieved successfully',
                    comments: paginatedComments,
                    totalComments: allComments.length,
                    currentPage: page,
                    totalPages: Math.ceil(allComments.length / limit)
                });
            } else {
                return res.status(404).json({ message: 'No comments on this post' });
            }
        } else {
            return res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        logger.error(`Error retrieving comments: ${error.message}`);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { AddCommentOnPost, DeleteCommentOnPost, GetAllCommentsByPostId };
