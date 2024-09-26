const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
    },
});

// Pre-save hook to set userid to the same as _id
userInfoSchema.pre('save', function (next) {
    this.userid = this._id; // Set userid to the _id of the document
    next();
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;
