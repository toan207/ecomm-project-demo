const express = require('express');
const router = express.Router();
const ProductController = require('../../controller/product.controller');

router.get('/:_id', ProductController.get);
router.get('/', ProductController.list);

module.exports = router;