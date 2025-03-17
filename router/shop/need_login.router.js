const express = require('express');
const router = express.Router();
const ShopController = require('../../controller/shop.controller');
const ProductController = require('../../controller/product.controller');

router.post('/products', ProductController.create);
router.patch('/products/update', ProductController.update);

router.get('/info', ShopController.get);
router.patch('/update', ShopController.update);


module.exports = router;