const ShopServices = require('../services/shop.service');
const {Paging} = require("../model/paging");
const {Success} = require("../model/base-message");
const {ResponseLib} = require("../lib/response.lib");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../configs");
const ProductService = require("../services/product/product.service");


async function add(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const verify = jwt.verify(token, JWT_SECRET);
  await ShopServices.add(req.body, verify.sub)
  return res.status(200).json({
    success: true,
    message: "Bạn đã đăng ký mở shop thành công!! Hãy đợi Người quản trị xác nhận!"
  })
}

async function update(req, res) {
  const shopId = req.params._id || req.shopId;
  await ShopServices.update(shopId, req.body);
  const result = Success();
  ResponseLib(res, result.code, result.message);
}

async function get(req, res) {
  const shop = await ShopServices.get(req.shopId);
  const result = Success();
  ResponseLib(res, result.code, result.message, {data: shop});
}

async function adminList(req, res) {
  const {page = 1, limit = 10, search} = req.query;
  const filters = {};
  if (!!search) filters.name = {$regex: search, $options: "i"};
  const shops = await ShopServices.list(page, limit, filters);
  const count = await ShopServices.count(filters);
  const paging = Paging(page, limit, count);
  const result = Success();
  ResponseLib(res, result.code, result.message, {data: shops, paging});
}

async function info(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const verify = jwt.verify(token, JWT_SECRET);
  const info = await ShopServices.info(verify.sub)
  
  if (!info['isActive']) {
    return res.json({
      success: false,
      data: true,
      message: "Tài khoản của bạn chưa được mở khoá hoặc bị người quản trị chặn hãy liên hệ để biết thêm chi tiết!"
    });
  }
  return res.json({success: true, data: info});
}

module.exports = {
  add,
  update,
  get,
  adminList,
  info,
}