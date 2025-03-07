const express = require("express");
const router = express.Router();

const AccountRouter = require('./account/no_login_account.router');
const VietnamRouter = require('./vietnam_district/no_login.router');
const BrandRouter = require('./brand/no_login.router');
const CategoryRouter = require('./category/no_login.router');
const BannerRouter = require('./banner/no_login.router');
const ProductRouter = require('./product/no_login.router');

router.use('/accounts', AccountRouter);
router.use('/vietnam', VietnamRouter);
router.use('/brands', BrandRouter);
router.use('/categories', CategoryRouter);
router.use('/banners', BannerRouter);
router.use('/products', ProductRouter)

module.exports = router;
