const followrsdata = require('../database/schema/userfollowersShema');

const Addusersintoafollowerslist = async (req, resp) => {
  try {
    const { userid, newFolllowerId, newFollowerEmail } = req.body;

    // Check if the user exists
    const checkUserIsPresentorNot = await followrsdata.findById(userid);
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

module.exports = { Addusersintoafollowerslist };
