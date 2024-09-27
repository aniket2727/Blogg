const UserInfo = require('../database/schema/userInfoSchema'); // Ensure this matches the export
const jwt = require('jsonwebtoken');
const { getCacheData, setCachedata } = require('../redisClient');

// Add user into database or register into the database
const Add_User_to_Database = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    try {
        // Check if user is already present in Redis cache
        const cacheuser = await getCacheData(email);
        if (cacheuser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // If not cached, check the database
        const existingUser = await UserInfo.findOne({ email });
        if (existingUser) {
            // Cache the user in Redis to avoid future DB hits
            setCachedata(email, existingUser);
            return res.status(400).json({ error: "Email is already registered" });
        }

        // Save the new user with plain text password
        const newUser = new UserInfo({ name, email, password });
        await newUser.save();

        // Cache the new user in Redis
        setCachedata(email, newUser);
        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        console.error("Error in Add_User_to_Database:", error);
        res.status(500).json({ error: "Internal server error", error });
    }
};

// Login user with email
const Login_user_with_email = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        // Check if user data is present in Redis cache
        const cacheuser = await getCacheData(email);
        if (cacheuser) {
            const userDataFromRedis = cacheuser;

            // Compare plain text password
            if (userDataFromRedis.password === password) {
                // Generate JWT token
                const token = jwt.sign(
                    { userId: userDataFromRedis._id, email: userDataFromRedis.email },
                    'your_secret_key', // Replace with your actual secret key
                    { expiresIn: '1h' } // Token expiry time
                );

                // Set cookie with the token
                res.cookie('token', token, {
                    httpOnly: true, // Cookie cannot be accessed via JavaScript (prevents XSS)
                    secure: true,   // Set to true if your site is HTTPS
                    sameSite: 'Strict' // Cookie sent only for same-site requests
                });

                return res.status(200).json({ message: "User login successful", user: userDataFromRedis, token });
            } else {
                return res.status(401).json({ message: "Incorrect password" });
            }
        }

        // Data is not present in Redis, check in the database
        const user_Data_with_email = await UserInfo.findOne({ email });

        if (user_Data_with_email) {
            // Cache user data to Redis
            await setCachedata(email, user_Data_with_email);

            // Compare plain text password
            if (password === user_Data_with_email.password) {
                // Generate JWT token
                const token = jwt.sign(
                    { userId: user_Data_with_email._id, email: user_Data_with_email.email },
                    'your_secret_key', // Replace with your actual secret key
                    { expiresIn: '1h' } // Token expiry time
                );

                // Set cookie with the token
                res.cookie('token', token, {
                    httpOnly: true, // Cookie cannot be accessed via JavaScript (prevents XSS)
                    secure: true,   // Set to true if your site is HTTPS
                    sameSite: 'Strict' // Cookie sent only for same-site requests
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
