const UserInfo = require('../database/schema/userInfoSchema'); // Ensure this matches the export

const Add_User_to_Database = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await UserInfo.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        const newUser = new UserInfo({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        console.error("Error in Add_User_to_Database:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const Login_user_with_email = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user_Data_with_email = await UserInfo.findOne({ email: email });

        if (user_Data_with_email) {
            if (password === user_Data_with_email.password) {
                // Set cookie (e.g., a session cookie or a token)
                res.cookie('user', user_Data_with_email._id, {
                    httpOnly: true, // Cookie cannot be accessed via JavaScript (prevents XSS)
                    secure: true,   // Set to true if your site is HTTPS
                    sameSite: 'Strict' // Cookie sent only for same-site requests
                });

                return res.status(200).json({ message: "User login successful", user: user_Data_with_email });
            } else {
                return res.status(401).json({ message: "Incorrect password" });
            }
        }

        res.status(404).json({ message: "Email is not valid" });
    } catch (error) {
        console.error("Error in Login_user_with_email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { Add_User_to_Database, Login_user_with_email };
