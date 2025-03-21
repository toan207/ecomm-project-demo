const ProductInfo = require('../../schema').models.ProductInfo


async function create(product, data) {
  const productInfo = await ProductInfo.create({
    product,
    ...data
  })
  
  if (!productInfo) throw new Error("Create Product Info Failed")
  return {
    message: "Create Product Info Successfully",
    data: productInfo
  }
}

async function update(_id, data) {
  return ProductInfo.findByIdAndUpdate(_id, data);
}

async function get(filter) {
  return ProductInfo.findOne(filter);
}

module.exports = {
  create, update, get
}