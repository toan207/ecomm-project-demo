const express = require("express");
const router = express.Router();

const AccountRouter = require('./account/no_login_account.router');
const VietnamRouter = require('./vietnam_district/no_login.router');
const BranchRouter = require('./branch/no_login.router');
const CategoryRouter = require('./category/no_login.router');

router.use('/account', AccountRouter);
router.use('/vietnam', VietnamRouter);
router.use('/branch', BranchRouter);
router.use('/category', CategoryRouter);

module.exports = router;
