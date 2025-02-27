const ProductInfo = require('../../schema').models.ProductInfo


export class ProductInfoService {
  static async create(product, data) {
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
  
  static async update(_id, data) {
    return ProductInfo.findByIdAndUpdate(_id, data);
  }
}