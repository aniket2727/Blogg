// router/userinfoRouter.js
const express = require('express');
const router = express.Router();
const { Add_User_to_Database } = require('../controller/userInfoController');

// Define the route for adding a user
router.post('/adduser', Add_User_to_Database);

module.exports = router;
