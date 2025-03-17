const express = require("express");
const shop_required = require("../middlewares/shop_role");
const router = express.Router();
const ShopController = require('../controller/shop.controller');
const {validateCreateShop} = require("../validations/shop");
const ProductController = require("../controller/product.controller");
const CouponController = require("../controller/coupon.controller");
const {validateUpdateProduct, validateCreateProduct} = require("../validations/product");
const {validateCreateCoupon, validateUpdateCoupon} = require("../validations/coupon");

router.get('/info', ShopController.info)
router.post('/create', validateCreateShop, ShopController.add)

router.use(shop_required);

router.get('/products', ProductController.list);
router.put('/products/:_id', validateUpdateProduct, ProductController.update);
router.patch('/products/:_id', ProductController.shopUpdateStatusProduct);
router.get('/products/:_id', ProductController.get);
router.post('/products', validateCreateProduct, ProductController.create);

router.put('/coupons/:_id', validateUpdateCoupon, CouponController.update);
router.post('/coupons', validateCreateCoupon, CouponController.add);
router.delete('/coupons/:_id', CouponController.deleteCoupon);
router.get('/coupons/:_id', CouponController.get);
router.get('/coupons', CouponController.list);

module.exports = router;
