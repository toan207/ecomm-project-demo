const express = require("express");
const router = express.Router();

const AccountRouter = require('./account/admin_account.router');
const ImageRouter = require('./image/admin.router');
const BranchRouter = require('./branch/admin.router');
const CategoryRouter = require('./category/admin.router');

router.use('/account', AccountRouter);
router.use('/image', ImageRouter);
router.use('/branch', BranchRouter);
router.use('/category', CategoryRouter);

module.exports = router;
