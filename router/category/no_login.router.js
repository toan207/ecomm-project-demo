const express = require('express');
const CategoryController = require('../../controller/category.controller');

const router = express.Router();

router.get('/info/:id', CategoryController.get);
router.get('/getAll', CategoryController.getAll);
router.get('/', CategoryController.list);

module.exports = router;