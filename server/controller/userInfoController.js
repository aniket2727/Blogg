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

    email=email.trim();
    password=password.trim();

    try {
        // Check if user is already present in Redis cache
        const cacheuser = await getCacheData(email);
        if (cacheuser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // Check if user exists in the database
        const existingUser = await UserInfo.findOne({ email });
        if (existingUser) {
            await setCachedata(email, JSON.stringify(existingUser)); // Cache user
            return res.status(400).json({ error: "Email is already registered" });
        }

        // Save the new user with plain-text password (not recommended)
        const newUser = new UserInfo({ name, email, password });
        await newUser.save();

        // Cache the new user in Redis
        await setCachedata(email, JSON.stringify(newUser));

        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        console.error("Error in Add_User_to_Database:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Login user with email
const Login_user_with_email = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Bad request data" });
        }
         
        email=email.trim();
        password=password.trim();
        // Check if user data is present in Redis cache
        const cacheuser = await getCacheData(email);
        if (cacheuser) {
            const userDataFromRedis = JSON.parse(cacheuser);
            
            console.log("Data retrieved from Redis", userDataFromRedis);
            console.log("Comparing passwords:", userDataFromRedis.password, "vs", password);

            // Compare plain-text passwords
            if (userDataFromRedis.password === password) {
                // Generate JWT token
                const token = jwt.sign(
                    { userId: userDataFromRedis._id, email: userDataFromRedis.email },
                    'your_secret_key', // Replace with your actual secret key
                    { expiresIn: '1h' }
                );

                // Set cookie with the token
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'Strict'
                });

                return res.status(200).json({ message: "User login successful", user: userDataFromRedis, token });
            } else {
                return res.status(401).json({ message: "Incorrect password" });
            }
        }

        // If not in cache, check in the database
        const user_Data_with_email = await UserInfo.findOne({ email });

        if (user_Data_with_email) {
            // Cache user data
            await setCachedata(email, JSON.stringify(user_Data_with_email));

            // Compare plain-text passwords
            if (password === user_Data_with_email.password) {
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
