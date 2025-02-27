const Product = require('../../schema').models.Product
const Shop = require('../../schema').models.Shop

export class ProductService {
  static async create(data) {
    const {shop, ...dataNew} = data
    
    if (shop) {
      const existShop = await Shop.findOne({_id: shop})
      if (!existShop) throw new Error("Shop not found")
    }
    
    const product = await Product.create(data);
    if (!product) throw new Error("Create Product Failed")
    
    return {
      messages: "Create Product Successfully", data: product
    }
  }
  
  static async get(_id) {
    const product = await Product.findOne({_id})
    if (!product) throw new Error("Product not found")
    return product
  }
  
  static async delete(_id) {
    const product = await Product.findOne({_id})
    if (!product) throw new Error("Product not found")
    await product.deleteOne();
    
    return {
      message: "Delete Product Successfully"
    }
  }
  
  static async update(_id, data) {
    return Product.findByIdAndUpdate(_id, data);
  }
}