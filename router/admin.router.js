const express = require("express");
const router = express.Router();

const AccountRouter = require('./account/admin_account.router');
const ImageRouter = require('./image/admin.router');
const BrandRouter = require('./brand/admin.router');
const CategoryRouter = require('./category/admin.router');
const BannerRouter = require('./banner/admin.router');

router.use('/account', AccountRouter);
router.use('/image', ImageRouter);
router.use('/brand', BrandRouter);
router.use('/category', CategoryRouter);
router.use('/banner', BannerRouter);

module.exports = router;
