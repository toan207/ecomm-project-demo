const express = require('express');
const BrandController = require('../../controller/brand.controller');

const router = express.Router();

router.get('/', BrandController.list);
router.get('/info/:id', BrandController.get);

module.exports = router;