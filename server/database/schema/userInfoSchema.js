const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;
