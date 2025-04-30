const express = require('express');
const router = express.Router();
const { getUser, createModAccount } = require('../controllers/user-controller')
const upload = require('../middleware/multer')

router.get('/user', getUser)
router.post('/user/create-mod', upload.single('avatar_url'), createModAccount)

module.exports = router;
