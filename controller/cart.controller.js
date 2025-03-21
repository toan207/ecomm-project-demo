const {Paging} = require("../model/paging");
const {Success} = require("../model/base-message");
const {ResponseLib} = require("../lib/response.lib");
const CartService = require('../services/cart.service')
const ProductService = require('../services/product/product.service')
const ProductVariantsService = require('../services/product/product-variants.service')
const ProductInfoService = require('../services/product/product-info.service')
const {convertObjectId} = require("../utils");

//------------------------------- import --------------------------------------

async function add(req, res) {
  try {
    const userId = req.user._id;
    const {product, quantity, variant} = req.body;
    
    const productData = await ProductService.get({_id: convertObjectId(product)});
    if (!productData) return res.status(404).json({message: "Product not found"});
    
    let stockCheck;
    if (variant) {
      const variantData = await ProductVariantsService.get({_id: convertObjectId(variant)});
      if (!variantData) return res.status(404).json({message: "Variant not found"});
      
      if (String(variantData[0]['product']) !== String(product)) {
        return res.status(400).json({message: "Variant not belong to product"});
      }
      
      stockCheck = variantData['stock'];
    } else {
      const productInfo = await ProductInfoService.get({product: convertObjectId(product)});
      if (!productInfo) return res.status(404).json({message: "Product info not found"});
      stockCheck = productInfo['stock'];
    }
    
    if (stockCheck < quantity) {
      return res.status(400).json({message: variant ? "Variant out of stock" : "Product out of stock"});
    }
    await CartService.add(userId, {product, quantity, variant: variant ?? null});
    
    ResponseLib(res, 200, "Add to cart successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
}

async function update(req, res) {
  try {
    const userId = req.user._id;
    await CartService.update(userId, req.body);
    const result = Success();
    ResponseLib(res, result.code, result.message);
  } catch (error) {
    console.error(error.message)
  }
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
  
  const cart = await CartService.get({account: userId}, Number(page), Number(limit));
  const count = await CartService.count(userId) || 0;
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