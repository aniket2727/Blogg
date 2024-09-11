const express=require('express');
const router=express.Router();
const {Add_post_with_email}=require('../controller/postDataController');
const middleware=require('../middleware/tokenAuthMiddleware')
router.post('/addpost',middleware,Add_post_with_email);
module.exports = router; 



