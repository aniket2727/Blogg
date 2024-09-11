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

module.exports = { Add_User_to_Database };
