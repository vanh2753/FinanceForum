const express = require('express');
const router = express.Router();
const { createTopic } = require('../controllers/topic-controller')

router.post('/topics/', createTopic)

module.exports = router;
