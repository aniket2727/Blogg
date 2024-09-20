const express=require('express');
const router=express.Router();
import { AddCommentOnPost,DeleteCommentOnPost } from '../controller/commentOnPost.Controllerjs';
import { route } from './postDataRouter';


router.post('/addcomment',AddCommentOnPost);
router.post('/deletecomment',DeleteCommentOnPost);

module.exports={router};