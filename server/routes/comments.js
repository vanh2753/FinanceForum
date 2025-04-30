const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middleware/authenticateToken')
const { optionalAuth } = require('../middleware/optionalAuth')
const { createComment, getAllCommentsForPost, updateComment, deleteComment } = require('../controllers/comment-controller')

router.post('/posts/:post_id/comments', authenticateToken, createComment);
router.get('/posts/:post_id/comments', optionalAuth, getAllCommentsForPost);
router.put('/comments/:id', authenticateToken, updateComment);
router.delete('/comments/:id', authenticateToken, deleteComment);


module.exports = router
