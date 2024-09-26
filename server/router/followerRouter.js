const express = require('express');
const router = express.Router();
const { Addusersintoafollowerslist, Removeuserfromfollowerslist } = require('../controller/followersManagementControlller');

// Routes
router.post('/addfollower', Addusersintoafollowerslist);
router.post('/removefollower', Removeuserfromfollowerslist);

// Export router
module.exports = router;
