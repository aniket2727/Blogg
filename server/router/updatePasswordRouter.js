const express = require('express');
const router = express.Router();
const {Update_password_of_user} = require('../controller/updatePasswordController');

// Use the route correctly
router.post('/update', Update_password_of_user);

module.exports = router;
