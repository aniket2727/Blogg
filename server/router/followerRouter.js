const express = require('express');
const router = express.Router();
const { 
    Addusersintoafollowerslist, 
    Removeuserfromfollowerslist, 
    GetFollowerCount, 
    GetFollowersWithUserInfo 
} = require('../controller/followersManagementControlller');

// Routes
router.post('/addfollower', Addusersintoafollowerslist); // Add follower
router.post('/removefollower', Removeuserfromfollowerslist); // Remove follower
router.get('/getfollowerscount/:userid', GetFollowerCount); // Get follower count
router.get('/getfollowersuserinfo/:userid', GetFollowersWithUserInfo); // Get followers info

// Export router
module.exports = router;
