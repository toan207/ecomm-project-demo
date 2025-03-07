const ProductService = require('../services/product/product.service')
const ProductInfoService = require('../services/product/product-info.service')
const ProductVariantsService = require('../services/product/product-variants.service')
const {Paging} = require("../model/paging");
const {Success} = require("../model/base-message");
const {ResponseLib} = require("../lib/response.lib");


//------------------------------- import --------------------------------------


async function create(req, res) {
  try {
    const {info, variants, ...data} = req.body;
    const product = await ProductService.create(data)
    if (!product) {
      return new Error("Failed to create product");
    }
    
    await Promise.all([
      ProductInfoService.create(product['_id'], info),
      variants && ProductVariantsService.create(product['_id'], variants),
    ]);
    return res.status(200).json({message: "Create Product Successfully"})
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
}

async function update(req, res) {
  try {
    const {_id} = req.params;
    const product = await ProductService.get(_id);
    if (!product) return new Error("Product not found")
    const {data, info, variants} = req.body;
    const updates = [
      data && ProductService.update(_id, data),
      info?._id ? ProductInfoService.update(info._id, info) : ProductInfoService.create(_id, info),
      ...variants.map((variant) =>
        variant._id ? ProductVariantsService.update(variant._id, variant) : ProductVariantsService.create(_id, variant)
      ),
    ].filter(Boolean);
    await Promise.all(updates);
    
    return res.status(200).json({message: "Update Product Successfully"})
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
}

async function deleteItem(req, res) {
  const {_id} = req.params;
  const {dele} = req.body
  const result = await ProductService.deleteItem(_id, dele);
  return res.status(200).json(result);
}

async function list(req, res) {
  const {page = 1, limit = 10, search, category, brand, shop, priceTo, priceEnd, rating} = req.query
  const filters = {};
  
  if (search) filters.name = {$regex: search, $options: "i"};
  if (category) filters.category = category;
  if (brand) filters.brand = brand;
  if (shop) filters.shop = shop;
  if (priceTo || priceEnd) {
    filters.price = {};
    if (priceTo) filters.price.$gte = Number(priceTo);
    if (priceEnd) filters.price.$lte = Number(priceEnd);
  }
  if (rating) filters.ratings.average = {$gte: Number(rating)};
  
  const products = await ProductService.list(page, limit, {...filters, delete: false, status: "active"});
  const paging = Paging(page, limit, products.length);
  const result = Success();
  ResponseLib(res, result.code, result.message, {data: products, paging});
}

async function adminList(req, res) {
  const {page = 1, limit = 10, search, category, brand, shop, priceTo, priceEnd, rating} = req.query
  const filters = {};
  
  if (!!search) filters.name = {$regex: search, $options: "i"};
  if (!!category) filters.category = category;
  if (!!brand) filters.brand = brand;
  if (!!shop) filters.shop = shop;
  if (Number(priceTo) || Number(priceEnd)) {
    filters.price = {};
    if (Number(priceTo)) filters.price.$gte = Number(priceTo);
    if (Number(priceEnd)) filters.price.$lte = Number(priceEnd);
  }
  if (Number(rating) > 0) {
    filters.ratings = filters.ratings || {};
    filters.ratings.average = {$gte: Number(rating)};
  }
  
  
  const products = await ProductService.list(page, limit, filters);
  const paging = Paging(page, limit, products.length);
  const result = Success();
  ResponseLib(res, result.code, result.message, {data: products, paging});
}

async function get(req, res) {
  try {
    const {_id} = req.params;
    const product = await ProductService.get(_id);
    if (!product) {
      return res.status(404).json({message: "Product not found!"});
    }
    
    const [productInfo, productVariant] = await Promise.all([
      ProductInfoService.get(product['_id']),
      product['variant'] ? ProductVariantsService.get(product['_id']) : Promise.resolve(null)
    ]);
    
    
    const result = Success();
    return ResponseLib(res, result.code, result.message, {
      product,
      productInfo,
      productVariant
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Internal Server Error"});
  }
}


//------------------------------- export --------------------------------------


module.exports = {
  create,
  update,
  deleteItem,
  list,
  adminList,
  get
}