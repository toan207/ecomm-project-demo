const express = require("express");
const router = express.Router();

const AccountRouter = require('./account/admin_account.router');
const BrandRouter = require('./brand/admin.router');
const CategoryRouter = require('./category/admin.router');
const BannerRouter = require('./banner/admin.router');
const ProductRouter = require('./product/admin.router')

router.use('/account', AccountRouter);
router.use('/brand', BrandRouter);
router.use('/category', CategoryRouter);
router.use('/banner', BannerRouter);
router.use('product', ProductRouter)

module.exports = router;
