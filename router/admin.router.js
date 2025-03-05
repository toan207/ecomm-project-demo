const express = require("express");
const router = express.Router();

const AccountRouter = require('./account/admin_account.router');
const BrandRouter = require('./brand/admin.router');
const CategoryRouter = require('./category/admin.router');
const BannerRouter = require('./banner/admin.router');
const ProductRouter = require('./product/admin.router')

router.use('/accounts', AccountRouter);
router.use('/brands', BrandRouter);
router.use('/categories', CategoryRouter);
router.use('/banners', BannerRouter);
router.use('/products', ProductRouter)

module.exports = router;
