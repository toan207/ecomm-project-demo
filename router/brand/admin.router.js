const express = require('express');
const BrandController = require('../../controller/brand.controller');

const router = express.Router();

router.get('', BrandController.adminList);
router.post('', BrandController.add);
router.get('/getAll', BrandController.getAll);
router.put('/:id', BrandController.update);
router.delete('/:id', BrandController.deleteItem);
router.patch('/:id/hide', BrandController.hideItem);

module.exports = router;
