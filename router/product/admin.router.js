const express = require('express');
const ProductController = require("../../controller/product.controller");
const {validateCreateProduct, validateUpdateProduct} = require("../../validations/product");

const router = express.Router();

router.get('/:_id', ProductController.get);
router.delete('/:_id', ProductController.deleteItem);
router.put('/:_id', validateUpdateProduct, ProductController.update);
router.post('/', validateCreateProduct, ProductController.create);
router.get('/', ProductController.adminList);

module.exports = router;