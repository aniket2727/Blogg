const express = require('express');
const router = express.Router();
const { 
    Addusersintoafollowerslist, 
    Removeuserfromfollowerslist, 
    GetFollowerCount, 
    GetFollowersWithUserInfo ,
    GetFollowedUsersById,
} = require('../controller/followersManagementControlller');

// Routes
router.post('/addfollower', Addusersintoafollowerslist); // Add follower
router.post('/removefollower', Removeuserfromfollowerslist); // Remove follower
router.post('/g', GetFollowerCount); // Get follower count
router.post('/getf', GetFollowersWithUserInfo); // Get followers info
router.post('/f', GetFollowedUsersById); // Get followers info

// Export router
module.exports = router;
