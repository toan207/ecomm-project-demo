const express = require('express');
const BrandController = require('../../controller/brand.controller');

const router = express.Router();

router.get('/info/:id', BrandController.get);
router.get('/getAll', BrandController.getAll);
router.get('/', BrandController.list);

module.exports = router;