const CouponService = require('../services/coupon.service')
const ProductService = require('../services/product/product.service')
const {Paging} = require("../model/paging");
const {Success} = require("../model/base-message");
const {ResponseLib} = require("../lib/response.lib");

async function add(req, res) {
  const {code, appliesTo, productIds, ...data} = req.body;
  
  const couponOld = await CouponService.get({code, shop: req.shopId});
  
  if (couponOld) {
    return res.status(400).json({message: "Create Coupon failed, code already exists"});
  }
  
  if (appliesTo === 'appliesTo') {
    for (const productId of productIds) {
      const product = await ProductService.get({_id: productId, shop: req.shopId, delete: false, status: "active"});
      if (!product) {
        return res.status(404).json({message: "Create Coupon failed"});
      }
    }
  }
  
  const coupon = await CouponService.create({...req.body, shop: req.shopId});
  
  if (!coupon) {
    return res.status(404).json({message: "Create Coupon failed"});
  }
  const result = Success();
  return ResponseLib(res, result.code, result.message, coupon);
}

async function update(req, res) {
  const coupon = await CouponService.get({_id: req.params._id, shop: req.shopId, delete: false});
  
  if (!coupon) {
    return res.status(404).json({message: "Coupon not found!"});
  }
  const {code, appliesTo, productIds, ...data} = req.body;
  
  if (appliesTo === 'appliesTo') {
    for (const productId of productIds) {
      const product = await ProductService.get({_id: productId, shop: req.shopId, delete: false, status: "active"});
      if (!product) {
        return res.status(404).json({message: "Create Coupon failed"});
      }
    }
  }
  
  try {
    const updateCoupon = await CouponService.update(req.params._id, req.body);
    const result = Success();
    return ResponseLib(res, result.code, result.message, updateCoupon);
  } catch (error) {
    console.log("error", error.message)
  }
}

async function deleteCoupon(req, res) {
  const {_id} = req.params;
  
  const coupon = await CouponService.get({_id, delete: false, shop: req.shopId});
  
  if (!coupon) {
    return res.status(404).json({message: "Coupon not found!"});
  }
  try {
    await CouponService.update(_id, {delete: true})
  } catch (error) {
    console.log("error", error.message)
  }
  const result = Success();
  return ResponseLib(res, result.code, "Delete Coupon Success!", coupon);
}

async function get(req, res) {
  const {_id} = req.params;
  const coupon = await CouponService.get({_id, delete: false});
  if (!coupon) {
    return res.status(404).json({message: "Coupon not found!"});
  }
  const result = Success();
  return ResponseLib(res, result.code, result.message, coupon);
}

async function list(req, res) {
  const {page = 1, limit = 10, search, shop} = req.query
  const filters = {
    shop: String(req.shopId) || shop,
    delete: false
  };
  if (search) {
    filters.$or = [
      {name: {$regex: search, $options: "i"}},
      {code: {$regex: search, $options: "i"}}
    ];
  }
  
  const coupons = await CouponService.list(page, limit, filters);
  const count = await CouponService.count(filters);
  const paging = Paging(page, limit, count);
  const result = Success();
  ResponseLib(res, result.code, result.message, {data: coupons, paging});
}

//------------------------------- export --------------------------------------

module.exports = {
  add,
  update,
  deleteCoupon,
  get,
  list
}