const express = require('express');
const BranchController = require('../../controller/branch.controller');

const router = express.Router();

router.get('/admin', BranchController.adminList);
router.post('/admin', BranchController.add);
router.put('/admin/:id', BranchController.update);
router.delete('/admin/:id', BranchController.deleteItem);
router.patch('/admin/:id/hide', BranchController.hideItem);

module.exports = router;
