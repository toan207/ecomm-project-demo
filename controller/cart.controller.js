const {Paging} = require("../model/paging");
const {Success} = require("../model/base-message");
const {ResponseLib} = require("../lib/response.lib");
const CartService = require('../services/cart.service')
const ProductService = require('../services/product/product.service')
const ProductVariantsService = require('../services/product/product-variants.service')
const ProductInfoService = require('../services/product/product-info.service')

//------------------------------- import --------------------------------------

async function add(req, res) {
  const userId = req.user._id;
  const {product, quantity, variant} = req.body;
  
  const productData = await ProductService.get(product);
  if (!productData) {
    return res.status(404).json({message: "Product not found"})
  }
  
  if (variant) {
    const variantData = await ProductVariantsService.get(variant);
    if (!variantData) {
      return res.status(404).json({message: "Variant not found"})
    }
    
    if (String(variantData['product']) !== String(product)) {
      return res.status(400).json({message: "Variant not belong to product"})
    }
    
    if (variantData['stock'] < quantity) {
      return res.status(400).json({message: "Variant out of stock"})
    }
  } else {
    const productInfo = await ProductInfoService.get(product);
    if (!productInfo) {
      return res.status(404).json({message: "Product info not found"})
    }
    
    if (productInfo['stock'] < quantity) {
      return res.status(400).json({message: "Product out of stock"})
    }
  }
  
  await CartService.add(userId, {product, quantity, variant});
  
  const result = Success();
  ResponseLib(res, result.code, result.message);
}

async function update(req, res) {
  const userId = req.user._id;
  await CartService.update(userId, req.body);
  const result = Success();
  ResponseLib(res, result.code, result.message);
}

async function remove(req, res) {
  const userId = req.user._id;
  const {_idProduct} = req.params;
  await CartService.remove(userId, _idProduct);
  const result = Success();
  ResponseLib(res, result.code, result.message);
}

async function get(req, res) {
  const userId = req.user._id;
  const {page = 1, limit = 10} = req.query
  
  const cart = await CartService.get({account: userId}, page, limit);
  const count = await CartService.count(userId);
  
  const paging = Paging(page, limit, count);
  const result = Success();
  
  ResponseLib(res, result.code, result.message, {data: cart, paging});
}

async function reset(req, res) {
  const userId = req.user._id;
  await CartService.reset(userId);
  return res.status(200).json({message: "Reset Cart Successfully"})
}

module.exports = {
  add, remove, get, update, reset
}