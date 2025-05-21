const express = require('express');
const router = express.Router();
const { createTopic, getTopicsForPreviewSection } = require('../controllers/topic-controller')

router.post('/topics/', createTopic)
router.get('/topics/preview-section', getTopicsForPreviewSection)

module.exports = router;
