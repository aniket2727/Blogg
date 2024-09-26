const { check } = require('express-validator');
const followersdata = require('../database/schema/userfollowersShema');
const userdata = require('../database/schema/userInfoSchema');

// Add a user to the followers list
const Addusersintoafollowerslist = async (req, resp) => {
  try {
    const { userid, newFolllowerId, newFollowerEmail } = req.body;

    // Check if the user exists
    const checkUserIsPresentorNot = await followersdata.findById(userid);
    if (checkUserIsPresentorNot) {
      // Check if the follower is already present in the follower's list
      const isAlreadyFollowing = checkUserIsPresentorNot.followersdetails.some(
        (item) => item.folllowerid === newFolllowerId
      );

      if (!isAlreadyFollowing) {
        // Add new follower
        checkUserIsPresentorNot.followersdetails.push({
          folllowerid: newFolllowerId,
          followeremail: newFollowerEmail,
        });

        // Save the updated user document
        const resultAfterAddingfollower = await checkUserIsPresentorNot.save();

        resp.status(200).json({
          message: 'Follower added successfully',
          result: resultAfterAddingfollower,
        });
      } else {
        resp.status(400).json({ message: 'User is already in the followers list' });
      }
    } else {
      resp.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    resp.status(500).json({ message: 'Internal server error' });
    console.error('Error:', error);
  }
};

// Remove a user from the followers list
const Removeuserfromfollowerslist = async (req, resp) => {
  const { userid, newfolllowerid } = req.body;
  try {
    // Check if the user is present
    const userPresentorNot = await followersdata.findById(userid);
    if (userPresentorNot) {
      // Check if the follower is present in the list
      const checkfollowersidIsPresentorNot = userPresentorNot.followersdetails.some(
        (item) => item.folllowerid === newfolllowerid
      );

      if (checkfollowersidIsPresentorNot) {
        // Remove the follower from the list
        userPresentorNot.followersdetails = userPresentorNot.followersdetails.filter(
          (item) => item.folllowerid !== newfolllowerid
        );

        // Save the updated user document
        const resultAfterRemoveFollower = await userPresentorNot.save();

        resp.status(200).json({
          message: 'Removed from following list',
          data: { userid, newfolllowerid },
        });
      } else {
        resp.status(404).json({ message: 'Follower not found' });
      }
    } else {
      resp.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    resp.status(500).json({ message: 'Internal server error', error });
  }
};

// Get follower count for a user
const GetFollowerCount = async (req, resp) => {
  const { userid } = req.params;
  try {
    const userFollowers = await followersdata.aggregate([
      { $match: { _id: userid } },
      { $unwind: '$followersdetails' },
      { $group: { _id: '$_id', followerCount: { $sum: 1 } } },
    ]);

    if (userFollowers.length > 0) {
      resp.status(200).json({
        message: 'Follower count retrieved successfully',
        count: userFollowers[0].followerCount,
      });
    } else {
      resp.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    resp.status(500).json({ message: 'Internal server error', error });
  }
};

// Get followers' details with user info
const GetFollowersWithUserInfo = async (req, resp) => {
  const { userid } = req.params;
  try {
    const followersDetails = await followersdata.aggregate([
      { $match: { _id: userid } },
      { $unwind: '$followersdetails' },
      {
        $lookup: {
          from: 'userinfo', // Make sure this matches your user info collection name
          localField: 'followersdetails.folllowerid',
          foreignField: 'userid', // Assuming 'userid' is the field in user info schema
          as: 'followerInfo',
        },
      },
      {
        $project: {
          _id: 0,
          'followersdetails.folllowerid': 1,
          'followersdetails.followeremail': 1,
          followerInfo: { $arrayElemAt: ['$followerInfo', 0] }, // Get the first matched user info
        },
      },
    ]);

    if (followersDetails.length > 0) {
      resp.status(200).json({
        message: 'Followers details retrieved successfully',
        followers: followersDetails,
      });
    } else {
      resp.status(404).json({ message: 'No followers found for this user' });
    }
  } catch (error) {
    resp.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  Addusersintoafollowerslist,
  Removeuserfromfollowerslist,
  GetFollowerCount,
  GetFollowersWithUserInfo,
};
