const express = require('express');
const CategoryController = require("../../controller/category.controller");

const router = express.Router();

router.post('/admin', CategoryController.add);
router.post('/admin', CategoryController.add);

module.exports = router;