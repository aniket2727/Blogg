// server.js (or index.js)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 9009;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection string
const mongoURI = 'mongodb://127.0.0.1:27017/mydatabase';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

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
const delete_post_by_id_router=require('./router/deletePostRouter')
// Use the routes
app.use('/app/user', add_user_router);
app.use('/app/login', login_user_router);
app.use('/app/password', update_user_password);
app.use('/app/post', add_postdata_router);
app.use('/app/post', delete_post_by_id_router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
