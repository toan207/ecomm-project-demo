const express = require('express');
const router = express.Router();
const CartController = require('../../controller/cart.controller');
const {validateAddToCart} = require("../../validations/cart");

module.exports = router;