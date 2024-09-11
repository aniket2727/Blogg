const UserInfo = require('../database/schema/userInfoSchema');

const Update_password_of_user = async (req, resp) => {
    const { email, old_password, new_password } = req.body;

    try {
        const find_data_by_email = await UserInfo.findOne({ email: email });
        console.log("all data",find_data_by_email)

        if (find_data_by_email) {
            if (find_data_by_email.password === old_password) {

                find_data_by_email.password = new_password;
                // Save the updated user document
                await find_data_by_email.save();
                return resp.status(200).json({ message: "Password updated successfully" });
            } else {
                console.log("not matched old passowrd is",find_data_by_email.password,"and new password is ",old_password);
                return resp.status(401).json({ message: "Incorrect password" });
            }
        } else {
            return resp.status(400).json({ message: "Email not found" });
        }

    } catch (error) {
        console.error("Error in Update_email_of_user:", error);
        return resp.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { Update_password_of_user };
