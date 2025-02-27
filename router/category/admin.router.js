const express = require('express');
const CategoryController = require('../../controller/category.controller');

const router = express.Router();

router.get('', CategoryController.adminList);
router.get('/getAll', CategoryController.getAll);
router.post('', CategoryController.add);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.deleteItem);
router.patch('/:id/hide', CategoryController.hideItem);

module.exports = router;