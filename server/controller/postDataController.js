const postdata = require('../database/schema/postDataSchema');
const userInfo=require('../database/schema/userInfoSchema');
const Add_post_with_email = async (req, resp) => {
    const { email, postContent } = req.body;

    try {
        // Check if the post exists for the given email
        const get_data_by_email = await userInfo.findOne({ email: email });

        if (get_data_by_email) {
            // Create a new post with the given content
            const post_content_to_save = new postdata({
                email: email,
                postContent: postContent
            });
            const postCreated= await post_content_to_save.save();

            return resp.status(201).json({ "message": "Post is saved successfully" ,"postcontent":postCreated});
        } else {
            return resp.status(401).json({ "message": "Email is not found" });
        }

    } catch (error) {
        console.error("There was an error:", error);
        return resp.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { Add_post_with_email };
