// server.js (or index.js)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
const port = 9009;
app.use(express.json()); // To parse JSON request bodies

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors()); // Fixed: Added parentheses
// MongoDB connection string
const mongoURI = 'mongodb://127.0.0.1:27017/mydatabase';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

// Import the routes
const add_user_router = require('./router/userinfoRouter');
const login_user_router=require('./router/userinfoRouter');
const update_user_password=require('./router/updatePasswordRouter');
const add_postdata_router=require('./router/postDataRouter');
const delete_post_by_id_router=require('./router/deletePostRouter');
const getallpost=require('./router/postDataRouter');
const postbyemail=require('./router/postDataRouter');
const postcomment=require('./router/commentRouter');
const addfollower=require('./router/followerRouter');
const removefollower=require('./router/followerRouter');
const followerscount=require('./router/followerRouter');
const getfollowerswithUserinfo=require('./router/followerRouter');

// Use the routes
app.use('/app', add_user_router);
app.use('/app1', login_user_router);
app.use('/app/password', update_user_password);
app.use('/app/post', add_postdata_router);
app.use('/d', delete_post_by_id_router);
app.use('/app',getallpost);
app.use('/post',postbyemail);
app.use('/c',postcomment);
app.use('/app',addfollower);
app.use('/app',removefollower);
app.use('/app',followerscount);
app.use('/app',getfollowerswithUserinfo);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
