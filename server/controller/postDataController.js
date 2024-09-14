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


const Delete_post_by_id = async (req, resp) => {
    const { id } = req.body;
    console.log("debugg",id);

    try {
        const find_post_by_id = await postdata.findOne({ _id: id });
        if (find_post_by_id) {
            // Delete the post and await the result
            const deleted_post_data = await postdata.findByIdAndDelete(id);
            return resp.status(200).json({ "message": "Post is deleted", deletedPostData: deleted_post_data });
        } else {
            return resp.status(404).json({ "message": "Post not found" });
        }

    } catch (error) {
        // Log the error for debugging purposes
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
  
module.exports = { Add_post_with_email ,Delete_post_by_id,Update_post_by_id,Getallpost};
