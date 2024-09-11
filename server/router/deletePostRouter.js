const express = require('express');
const router = express.Router();

const validation = require('../middleware/tokenAuthMiddleware');
const  Delete_post_by_id  = require('../router/postDataRouter');

// Applying validation middleware if needed
router.post('/deletepost', Delete_post_by_id);

module.exports = router;
