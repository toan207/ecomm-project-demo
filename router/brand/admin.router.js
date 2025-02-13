const express = require('express');
const BrandController = require('../../controller/brand.controller');

const router = express.Router();

router.get('/admin', BrandController.adminList);
router.post('/admin', BrandController.add);
router.put('/admin/:id', BrandController.update);
router.delete('/admin/:id', BrandController.deleteItem);
router.patch('/admin/:id/hide', BrandController.hideItem);

module.exports = router;
