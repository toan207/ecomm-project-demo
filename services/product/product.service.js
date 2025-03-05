const Product = require('../../schema').models.Product

async function create(data) {
  const product = await Product.create(data);
  if (!product) throw new Error("Create Product Failed")
  return product
}

async function deleteItem(_id, dele) {
  const product = await Product.findOne({_id})
  if (!product) throw new Error("Product not found")
  
  await Product.findByIdAndUpdate({_id}, {delete: dele})
  
  return {
    message: "Delete Product Successfully"
  }
}

async function update(_id, data) {
  return Product.findByIdAndUpdate(_id, data);
}

async function get(_id) {
  const product = await Product.findOne({_id})
  if (!product) throw new Error("Product not found")
  return product
}


async function list(page, limit, filters) {
  return Product.find(filters)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate('shop', 'name')
    .populate('brand', 'name')
    .populate('category', 'name')
    .sort({createdAt: -1})
}

module.exports = {
  create, get, deleteItem, update, list
}