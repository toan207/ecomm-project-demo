const express = require('express');
const BranchController = require('../../controller/branch.controller');

const router = express.Router();

router.get('/', BranchController.list);
router.get('/:id', BranchController.get);

module.exports = router;