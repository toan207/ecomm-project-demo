const express = require('express');
const ProductController = require("../../controller/product.controller");
const {validateCreateProduct, validateUpdateProduct} = require("../../validations/product");

const router = express.Router();

router.post('/', validateCreateProduct, ProductController.create);
router.put('/:_id', validateUpdateProduct, ProductController.update);
router.delete('/:_id', ProductController.deleteItem);

module.exports = router;