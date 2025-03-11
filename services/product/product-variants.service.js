const ProductVariant = require('../../schema').models.ProductVariants

async function create(product, data) {
  return ProductVariant.create({product, ...data})
}

async function update(_id, data) {
  return ProductVariant.findByIdAndUpdate(_id, data);
}

async function get(product) {
  return ProductVariant.find({product})
}

async function getById(_id) {
  return ProductVariant.findOne({_id})
}

module.exports = {
  create, update, get, getById
}