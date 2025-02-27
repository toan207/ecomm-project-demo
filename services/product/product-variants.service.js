const ProductVariant = require('../../schema').models.ProductVariants

export class ProductVariantsService {
  static async create(product, data) {
    for (const item of data) {
      await ProductVariant.create({
        product,
        ...item
      })
    }
  }
  
  static async update(_id, data) {
    return ProductVariant.findByIdAndUpdate(_id, data);
  }
}