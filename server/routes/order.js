const express = require('express');
const router = express.Router();
const { createOrder, checkIfPurchased } = require('../controllers/order-controller');
const { authenticateToken } = require('../middleware/authenticateToken')

router.get('/orders/:productId/check-purchased', authenticateToken, checkIfPurchased);
router.post('/orders/:productId', authenticateToken, createOrder);

module.exports = router;