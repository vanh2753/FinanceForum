const express = require('express');
const router = express.Router();
const { getUser, createModAccount, assignExpertRole, getAllUser } = require('../controllers/user-controller')
const { upload } = require('../middleware/multer');
const { authenticateToken } = require('../middleware/authenticateToken');
const { authorizeRoles } = require('../middleware/authorizeRoles');

router.get('/user', getAllUser)
router.post('/user/create-mod', upload.single('avatar_url'), createModAccount)
router.put('/user/:id/assign-expert', authenticateToken, authorizeRoles('mod'), assignExpertRole)


module.exports = router;
