const ProductVariant = require('../../schema').models.ProductVariants

async function create(product, data) {
  return ProductVariant.create({product, ...data})
}

async function update(_id, data) {
  return ProductVariant.findByIdAndUpdate(_id, data);
}

async function get(filters) {
  return ProductVariant.find(filters)
}

async function getById(_id) {
  return ProductVariant.findOne({_id})
}

module.exports = {
  create, update, get, getById
}