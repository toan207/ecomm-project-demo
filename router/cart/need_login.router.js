const express = require('express');
const router = express.Router();
const CartController = require('../../controller/cart.controller');
const {validateAddToCart} = require("../../validations/cart");

router.post('/add', validateAddToCart, CartController.add);
router.put('/update',validateAddToCart, CartController.update);
router.post('/remove/:_idProduct', CartController.remove);
router.post('/reset', CartController.reset);
router.get('/', CartController.get);

module.exports = router;