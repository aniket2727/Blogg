
const followersdata = require('../database/schema/userfollowersShema');
const userdata = require('../database/schema/userInfoSchema');

// Add a user to the followers list
const Addusersintoafollowerslist = async (req, resp) => {
  try {
    // For userid newfollwerid is new follower
    const { userId, newFollowerId, newFollowerEmail } = req.body;

    // Check if the user exists in userdata
    const userExists = await userdata.findOne({ userid: userId });
    //const followerexits=await userdata.findOne({userid:newFollowerId});
    if (!userExists) {
      return resp.status(404).json({ message: 'User not found' });
    }

    // Check if the user exists in followersdata
    const userExistsInFollowersData = await followersdata.findOne({ userid: userId });
    if (!userExistsInFollowersData) {
      // If followersdata does not exist, create a new entry in followersdata
      const newFollowerData = new followersdata({
        userid: userId,
        followersdetails: [{
        folllowerid: newFollowerId,
          followeremail: newFollowerEmail
        }]
      });
      await newFollowerData.save();

      return resp.status(200).json({
        message: 'New follower added successfully',
        result: newFollowerData
      });
    } else {
      // If user exists, check if the new follower is already present in followersdetails
      const isNewFollowerAlreadyFollowing = userExistsInFollowersData.followersdetails.some(
        (item) => item.folllowerid=== newFollowerId
      );

      if (!isNewFollowerAlreadyFollowing) {
        // Add new follower to the user's follower list
        userExistsInFollowersData.followersdetails.push({
          folllowerid: newFollowerId,
          followeremail: newFollowerEmail
        });

        // Save the updated follower document
        const resultAfterAddingFollower = await userExistsInFollowersData.save();
        return resp.status(200).json({
          message: 'Follower added successfully',
          result: resultAfterAddingFollower
        });
      } else {
        return resp.status(400).json({
          message: 'User is already in the followers list'
        });
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
      // Check if the user is present in followersdata
      const userPresentorNot = await followersdata.findOne({ userid: userId });
      console.log(userPresentorNot);
      if (!userPresentorNot) {
        return resp.status(404).json({ message: 'User not found' });
      }
  
      // Check if the follower is present in the followers list
      const followerExists = userPresentorNot.followersdetails.some(
        (item) => item.folllowerid === newFollowerId
      );
  
      if (!followerExists) {
        return resp.status(404).json({ message: 'Follower not found' });
      }
  
      // Remove the follower from the list
      userPresentorNot.followersdetails = userPresentorNot.followersdetails.filter(
        (item) => item.folllowerid !== newFollowerId
      );
  
      // Save the updated user document
      const resultAfterRemoveFollower = await userPresentorNot.save();
  
      resp.status(200).json({
        message: 'Removed from followers list',
        data: resultAfterRemoveFollower,
      });
    } catch (error) {
      resp.status(500).json({ message: 'Internal server error', error });
      console.error('Error:', error);
    }
  };


  // Get follower count for a user
const GetFollowerCount = async (req, resp) => {
    const { userid } = req.body; // Get userid from request body
    console.log(userid);
    try {
      // Use aggregation to get the count of followers
      const followerCountResult = await followersdata.aggregate([
        { $match: { userid: userid } }, // Match the user by userid
        { $project: { followerCount: { $size: '$followersdetails' } } } // Project the size of followers array
      ]);
  
      if (followerCountResult.length > 0) {
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

  
// // Get followers' details with user info
// const GetFollowersWithUserInfo = async (req, resp) => {
//   const { userid } = req.params;
//   try {
//     const followersDetails = await followersdata.aggregate([
//       { $match: { _id: userid } },
//       { $unwind: '$followersdetails' },
//       {
//         $lookup: {
//           from: 'userinfo', // Make sure this matches your user info collection name
//           localField: 'followersdetails.folllowerid',
//           foreignField: 'userid', // Assuming 'userid' is the field in user info schema
//           as: 'followerInfo',
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           'followersdetails.folllowerid': 1,
//           'followersdetails.followeremail': 1,
//           followerInfo: { $arrayElemAt: ['$followerInfo', 0] }, // Get the first matched user info
//         },
//       },
//     ]);

//     if (followersDetails.length > 0) {
//       resp.status(200).json({
//         message: 'Followers details retrieved successfully',
//         followers: followersDetails,
//       });
//     } else {
//       resp.status(404).json({ message: 'No followers found for this user' });
//     }
//   } catch (error) {
//     resp.status(500).json({ message: 'Internal server error', error });
//   }
// };

module.exports = {
  Addusersintoafollowerslist,
  Removeuserfromfollowerslist,
  GetFollowerCount
//   GetFollowersWithUserInfo,
};
