const ProductVariant = require('../../schema').models.ProductVariants

async function create(product, data) {
  for (const item of data) {
    await ProductVariant.create({
      product,
      ...item
    })
  }
}

async function update(_id, data) {
  return ProductVariant.findByIdAndUpdate(_id, data);
}

async function get(product) {
  return ProductVariant.find({product})
}

module.exports = {
  create, update, get
}