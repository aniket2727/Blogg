const postdata = require('../database/schema/postDataSchema');
const mongoose = require('mongoose');
const redis = require('redis');
const winston = require('winston');

// Redis client setup
const redisClient = redis.createClient();
redisClient.connect();

// Logger setup using winston
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console()
    ]
});

const AddCommentOnPost = async (req, res) => {
    const { postid, newpostcomment, author } = req.body;

    try {
        // Find the post by its ID
        const result = await postdata.findById(postid);

        if (result) {
            // Create a new comment object
            const comment = {
                text: newpostcomment,
                author: author || 'Anonymous' // Default to 'Anonymous' if no author is provided
            };

            // Push the new comment to the comments array
            result.comments.push(comment);

            // Save the updated post document
            await result.save();

            res.status(200).json({ message: "Comment added successfully", comment });
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


const DeleteCommentOnPost = async (req, res) => {
    const { postid, commentid } = req.body;

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

                res.status(200).json({ message: "Comment deleted successfully" });
            } else {
                res.status(404).json({ message: "Comment not found" });
            }
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



const GetallcommentbyPostId=async(req,res)=>{

    const{postid}=req.postid;
    try{
        const findpost=await postdata.findById(postid);
        if(findpost){
             const allcomment=findpost.comments;

             if(allcomment){
                res.status(200).json({"message":'all comments',allcomment});
             }else{
                res.status(404).json({"message":"no comments on this post"});
             }
        }else{
            res.status(404).json({"message":"post is not found"})
        }
    }
    catch(error){
        res.status(500).json({"message":"internal server error"});
    }

}




// Get all comments by post ID with pagination
// Get all comments by post ID with pagination
const GetAllCommentsByPostId = async (req, res) => {
    const { postid } = req.body; // Destructure postid from req.body
    const { limit = 10, page = 1 } = req.query; // Pagination parameters

    // Validate postid
    if (!mongoose.Types.ObjectId.isValid(postid)) {
        return res.status(400).json({ message: 'Invalid post ID format' });
    }

    try {
        // Check Redis cache
        const cachedComments = await redisClient.get(postid);
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

                // Cache comments in Redis
                await redisClient.set(postid, JSON.stringify(allComments), 'EX', 600);

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
