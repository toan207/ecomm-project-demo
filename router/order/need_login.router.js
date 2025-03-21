const express = require('express');
const router = express.Router();
const OrderController = require('../../controller/order.controller');
const {validateUserUpdateOrder, validateCreateOrder, validateCheckout} = require('../../validations/order')

router.post('/:_id/cancel-order', validateUserUpdateOrder, OrderController.cancelOrder);
router.post('/review', validateCreateOrder, OrderController.checkoutReview);
router.post('/checkout', validateCheckout, OrderController.checkout);
router.get('/:_id', OrderController.get);
router.get('', OrderController.list);

module.exports = router;

