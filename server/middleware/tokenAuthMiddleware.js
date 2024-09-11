

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Retrieve the token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        // Add decoded user info to request object
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = verifyToken;

