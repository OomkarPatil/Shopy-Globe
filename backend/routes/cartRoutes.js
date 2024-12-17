const express = require('express');
const { addToCart, updateCart, removeFromCart } = require('../controllers/cartController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/cart', authMiddleware, addToCart);
router.put('/cart', authMiddleware, updateCart);
router.delete('/cart/:productId', authMiddleware, removeFromCart);

module.exports = router;

