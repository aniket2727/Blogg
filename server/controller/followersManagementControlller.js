
const followersdata = require('../database/schema/userfollowersShema');
const userdata = require('../database/schema/userInfoSchema');
const { getCacheData, setCachedata } = require('../redisClient');

// Add a user to the followers list
const Addusersintoafollowerslist = async (req, resp) => {
  try {
    const { userId, newFollowerId, newFollowerEmail } = req.body;
    console.log("fiels ",userId,newFollowerId,newFollowerEmail);

    // Validate input
    if (!userId || !newFollowerId || !newFollowerEmail) {
      return resp.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await userdata.findOne({ userid: userId });
    if (!userExists) {
      return resp.status(404).json({ message: 'User not found' });
    }

    const userExistsInFollowersData = await followersdata.findOne({ userid: userId });
    if (!userExistsInFollowersData) {
      const newFollowerData = new followersdata({
        userid: userId,
        followersdetails: [{
          folllowerid: newFollowerId,
          followeremail: newFollowerEmail
        }]
      });
      await newFollowerData.save();
      return resp.status(200).json({ message: 'New follower added successfully', result: newFollowerData });
    } else {
      const isNewFollowerAlreadyFollowing = userExistsInFollowersData.followersdetails.some(
        (item) => item.folllowerid === newFollowerId
      );

      if (!isNewFollowerAlreadyFollowing) {
        userExistsInFollowersData.followersdetails.push({
          folllowerid: newFollowerId,
          followeremail: newFollowerEmail
        });

        const resultAfterAddingFollower = await userExistsInFollowersData.save();
        return resp.status(200).json({ message: 'Follower added successfully', result: resultAfterAddingFollower });
      } else {
        return resp.status(400).json({ message: 'User is already in the followers list' });
      }
    }
  } catch (error) {
    resp.status(500).json({ message: 'Internal server error' });
    console.error('Error:', error);
  }
};

// Remove a user from the followers list
const Removeuserfromfollowerslist = async (req, resp) => {
  const { userId, newFollowerId } = req.body;

  try {
    if (!userId || !newFollowerId) {
      return resp.status(400).json({ message: 'All fields are required' });
    }

    const userPresentorNot = await followersdata.findOne({ userid: userId });
    if (!userPresentorNot) {
      return resp.status(404).json({ message: 'User not found' });
    }

    const followerExists = userPresentorNot.followersdetails.some(
      (item) => item.folllowerid === newFollowerId
    );

    if (!followerExists) {
      return resp.status(404).json({ message: 'Follower not found' });
    }

    userPresentorNot.followersdetails = userPresentorNot.followersdetails.filter(
      (item) => item.folllowerid !== newFollowerId
    );

    const resultAfterRemoveFollower = await userPresentorNot.save();
    resp.status(200).json({ message: 'Removed from followers list', data: resultAfterRemoveFollower });
  } catch (error) {
    resp.status(500).json({ message: 'Internal server error', error });
    console.error('Error:', error);
  }
};

// Get follower count for a user
const GetFollowerCount = async (req, resp) => {
  const { userid } = req.body;
  try {
    if (!userid) {
      return resp.status(400).json({ message: 'User ID is required' });
    }

    // Check cache first
    const cachedCount = await getCacheData(`followerCount:${userid}`);
    if (cachedCount) {
      return resp.status(200).json({
        message: 'Follower count retrieved from cache',
        count: Number(cachedCount),
      });
    }

    const followerCountResult = await followersdata.aggregate([
      { $match: { userid: userid } },
      { $project: { followerCount: { $size: '$followersdetails' } } }
    ]);

    if (followerCountResult.length > 0) {
      // Set cache with an expiration time, e.g., 1 hour
      await setCachedata(`followerCount:${userid}`, followerCountResult[0].followerCount, 3600);
      resp.status(200).json({
        message: 'Follower count retrieved successfully',
        count: followerCountResult[0].followerCount,
      });
    } else {
      resp.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    resp.status(500).json({ message: 'Internal server error', error });
  }
};


  
// Get followers' details with user info
// Get followers' details for a particular user
const GetFollowersWithUserInfo = async (req, resp) => {
  const { userid } = req.body; // Extract user ID from request body

  try {
    // Find the follower details for the specified user ID
    const followersDetails = await followersdata.findOne(
      { userid: userid }, // Match the user ID
      { followersdetails: 1 } // Only return the followers details field
    );

    if (followersDetails && followersDetails.followersdetails.length > 0) {
      resp.status(200).json({
        message: 'Followers details retrieved successfully',
        followers: followersDetails.followersdetails, // Send the followers details
      });
    } else {
      resp.status(404).json({ message: 'No followers found for this user' });
    }
  } catch (error) {
    resp.status(500).json({ message: 'Internal server error', error });
  }
};


// Get all users followed by a specific user
const GetFollowedUsersById = async (req, resp) => {
  try {
    const { newFollowerId } = req.body; // Get the newFollowerId from the request body
    console.log("Checking for users followed by ID: ", newFollowerId);

    // Validate input
    if (!newFollowerId) {
      return resp.status(400).json({ message: 'New follower ID is required' });
    }

    // Find all records in the followingDataModel where followersdetails.folllowerid matches newFollowerId
    const followedUsers = await followersdata.find({
      "followersdetails.folllowerid": newFollowerId
    });

    if (!followedUsers.length) {
      return resp.status(404).json({ message: 'No users followed by this ID' });
    }

    // Extract user IDs who are followed by the specified newFollowerId
    const followedUserIds = followedUsers.map(user => user.userid);

    return resp.status(200).json({
      message: 'Followed users retrieved successfully',
      result: followedUserIds,
    });
  } catch (error) {
    resp.status(500).json({ message: 'Internal server error' });
    console.error('Error:', error);
  }
};


module.exports = {
  Addusersintoafollowerslist,
  Removeuserfromfollowerslist,
  GetFollowerCount,
  GetFollowersWithUserInfo,
  GetFollowedUsersById
};
