const express = require("express");
const router = express.Router();

const AccountRouter = require('./account/no_login_account.router');
const VietnamRouter = require('./vietnam_district/no_login.router');
const BrandRouter = require('./brand/no_login.router');
const CategoryRouter = require('./category/no_login.router');
const BannerRouter = require('./banner/no_login.router');

router.use('/account', AccountRouter);
router.use('/vietnam', VietnamRouter);
router.use('/brand', BrandRouter);
router.use('/category', CategoryRouter);
router.use('/banner', BannerRouter);

module.exports = router;
