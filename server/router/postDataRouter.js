const express=require('express');
const router=express.Router();
const {Add_post_with_email}=require('../controller/postDataController');

router.post('/addpost',Add_post_with_email);
module.exports = router; 



