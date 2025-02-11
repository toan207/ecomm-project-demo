const express = require('express');
const CategoryController = require('../../controller/category.controller');

const router = express.Router();

router.get('/', CategoryController.list);
router.get('/:id', CategoryController.get);

module.exports = router;