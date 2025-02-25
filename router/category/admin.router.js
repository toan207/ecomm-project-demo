const express = require('express');
const CategoryController = require('../../controller/category.controller');

const router = express.Router();

router.get('/admin', CategoryController.adminList);
router.get('/admin/getAll', CategoryController.getAll);
router.post('/admin', CategoryController.add);
router.put('/admin/:id', CategoryController.update);
router.delete('/admin/:id', CategoryController.deleteItem);
router.patch('/admin/:id/hide', CategoryController.hideItem);

module.exports = router;