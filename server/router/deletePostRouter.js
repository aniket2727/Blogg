const express = require('express');
const router = express.Router();

const validation = require('../middleware/tokenAuthMiddleware');
const  {Delete_post_by_id}  = require('../controller/postDataController');

// Applying validation middleware if needed
router.post('/d', Delete_post_by_id);

module.exports = router;
