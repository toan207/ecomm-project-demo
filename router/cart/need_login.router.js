const express = require('express');
const router = express.Router();
const CartController = require('../../controller/cart.controller');
const {validateAddToCart} = require("../../validations/cart");

router.post('/add', validateAddToCart, CartController.add);
router.put('/update', CartController.update);
router.post('/remove/:_idProduct', CartController.remove);
router.post('/rest', CartController.reset);
router.get('/', CartController.get);

module.exports = router;