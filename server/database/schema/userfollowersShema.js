const mongoose = require('mongoose');

// Create Follow Schema
const Followingschema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  followersdetails: [
    {
      folllowerid: {
        type: String,
        required: true
      },
      followeremail: {
        type: String,
        required: true
      }
    }
  ]
});

// Create model for follower details
const followingDataModel = mongoose.model('followesdetails', Followingschema);

// Export the model
module.exports = followingDataModel;
