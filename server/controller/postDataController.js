const postdata = require('../database/schema/postDataSchema');
const userInfo = require('../database/schema/userInfoSchema');
const { getCacheData, setCachedata } = require('../redisClient'); // Import Redis client functions

const Add_post_with_email = async (req, resp) => {
    const { email, postContent, postcreaterId } = req.body;
   
    // coalscapping operators
    const postcreaterIdValue = postcreaterId ?? "1";
    console.log(email,postContent,postcreaterIdValue)

    try {
        // Check if the post exists for the given email
        const get_data_by_email = await userInfo.findOne({ email: email });

        if (get_data_by_email) {
            // Create a new post with the given content
            const post_content_to_save = new postdata({
                email: email,
                postContent: postContent,
                postcreaterId:postcreaterIdValue,
            });
            const postCreated = await post_content_to_save.save();

            // Invalidate cache if needed
            await setCachedata(email, null); // Clear cache for user's posts

            return resp.status(201).json({ "message": "Post is saved successfully", "postcontent": postCreated });
        } else {
            return resp.status(401).json({ "message": "Email is not found" });
        }

    } catch (error) {
        console.error("There was an error:", error);
        return resp.status(500).json({ message: "Internal server error" });
    }
};




const Delete_post_by_id = async (req, resp) => {
    const { id } = req.body;

    try {
        const find_post_by_id = await postdata.findOne({ _id: id });
        if (find_post_by_id) {
            // Delete the post and await the result
            const deleted_post_data = await postdata.findByIdAndDelete(id);

            // Invalidate cache for deleted post
            await setCachedata(find_post_by_id.email, null); // Clear cache for user's posts

            return resp.status(200).json({ "message": "Post is deleted", deletedPostData: deleted_post_data });
        } else {
            return resp.status(404).json({ "message": "Post not found" });
        }

    } catch (error) {
        console.error(error);
        resp.status(500).json({ "message": "Internal server error" });
    }
};

const Update_post_by_id = async (req, resp) => {
    const { id, updatedPost } = req.body;

    try {
        // Update the post by ID and return the updated document
        const updated_data = await postdata.findByIdAndUpdate(
            id,
            { postContent: updatedPost },
            { new: true } // Return the updated document
        );

        if (updated_data) {
            // Invalidate cache for updated post
            await setCachedata(updated_data.email, null); // Clear cache for user's posts

            return resp.status(200).json({ "message": "Post updated successfully", updatedPostData: updated_data });
        } else {
            return resp.status(404).json({ "message": "Post not found" });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).json({ "message": "Internal server error" });
    }
};

const Getallpost = async (req, resp) => {
    try {
        const getallpostdata = await postdata.find();

        if (getallpostdata && getallpostdata.length > 0) {
            resp.status(200).json({ message: "Data has been sent", getallpostdata });
        } else {
            resp.status(404).json({ message: "No posts found" });
        }
    } catch (error) {
        console.error("Error occurred: ", error);
        resp.status(500).json({ message: "Internal server error" });
    }
};

const Getallpostbyemail = async (req, res) => {
    const { email } = req.body;

    try {
        // Directly query the database for posts by email
        const findallpostbyemail = await postdata.find({ email: email });

        if (findallpostbyemail.length > 0) {
            res.status(200).json({ message: findallpostbyemail });
        } else {
            res.status(401).json({ message: "No post for this email" });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


  
module.exports = { Add_post_with_email, Delete_post_by_id, Update_post_by_id, Getallpost, Getallpostbyemail };
