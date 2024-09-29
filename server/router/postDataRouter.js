const express=require('express');
const router=express.Router();
const {Add_post_with_email,Getallpost,Getallpostbyemail,GetPostCountByCreatorId}=require('../controller/postDataController');



const middleware=require('../middleware/tokenAuthMiddleware')
router.post('/addpost',Add_post_with_email);
router.get('/getallpost',Getallpost);
router.post('/epost',Getallpostbyemail);
router.post('/postcount',GetPostCountByCreatorId)

module.exports = router; 



