// router/userinfoRouter.js
const express = require('express');
const router = express.Router();
const { Add_User_to_Database } = require('../controller/userInfoController');
const {Login_user_with_email}=require('../controller/userInfoController')
// Define the route for adding a user
router.post('/adduser', Add_User_to_Database);
router.post('/login',Login_user_with_email);

module.exports = router;
