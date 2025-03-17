const express = require('express');
const ShopController = require('../../controller/shop.controller');

const router = express.Router();

router.put('/:_id', ShopController.update);
router.get('', ShopController.adminList);

module.exports = router;
