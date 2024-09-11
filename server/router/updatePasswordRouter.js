const express = require('express');
const router = express.Router();
const {Update_password_of_user} = require('../controller/updatePasswordController');
const verifyToken = require('../middleware/tokenAuthMiddleware');
// Use the route correctly
router.post('/update', verifyToken, Update_password_of_user);

module.exports = router;
