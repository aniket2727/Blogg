const UserInfo = require('../database/schema/userInfoSchema');
const jwt = require('jsonwebtoken');
const { getCacheData, setCachedata } = require('../redisClient');

// Add user into database or register into the database
const Add_User_to_Database = async (req, res) => {
    let { name, email, password } = req.body;
    console.log(name, email, password);

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Bad request data" });
    }

    // Trim and sanitize name
    name = name.trim();
    if (name.length > 20) {
        name = name.slice(0, 20);
    }

    email = email.trim();
    password = password.trim();

    try {
        // Check if user is already present in Redis cache
        const cacheuser = await getCacheData(email);
        if (cacheuser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // Check if user exists in the database
        const existingUser = await UserInfo.findOne({ email });
        if (existingUser) {
            // Cache each field manually
            await setCachedata(email, JSON.stringify({
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                password: existingUser.password, // Consider hashing passwords in a real app
            }));
            return res.status(400).json({ error: "Email is already registered" });
        }

        // Save the new user with plain-text password
        const newUser = new UserInfo({ name, email, password });
        await newUser.save();

        // Cache each field manually
        await setCachedata(email, JSON.stringify({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password, // Consider hashing passwords in a real app
        }));

        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        console.error("Error in Add_User_to_Database:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Login user with email
const Login_user_with_email = async (req, res) => {
    let { email, password } = req.body;
    console.log(email, password);

    try {
        // Validate request data
        if (!email || !password) {
            return res.status(400).json({ message: "Bad request data" });
        }

        email = email.trim();
        password = password.trim();

        // Check user data in the database
        const user_Data_with_email = await UserInfo.findOne({ email });

        if (user_Data_with_email) {
            console.log("User found in database:", user_Data_with_email);

            // Compare plain-text passwords
            if (password === user_Data_with_email.password) { // Consider hashing passwords in a real app
                // Generate JWT token
                const token = jwt.sign(
                    { userId: user_Data_with_email._id, email: user_Data_with_email.email },
                    'your_secret_key',
                    { expiresIn: '1h' }
                );

                // Set cookie with the token
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'Strict'
                });

                return res.status(200).json({ message: "User login successful", user: user_Data_with_email, token });
            } else {
                return res.status(401).json({ message: "Incorrect password" });
            }
        }

        res.status(404).json({ message: "Email not found, please provide a valid email" });

    } catch (error) {
        console.error("Error in Login_user_with_email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { Add_User_to_Database, Login_user_with_email };
