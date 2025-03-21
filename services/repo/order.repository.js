const ProductService = require('../../services/product/product.service')
const ProductInfoService = require('../../services/product/product-info.service')
const ProductVariantsService = require('../../services/product/product-variants.service')
const DiscountService = require('../../services/coupon.service')
const {convertObjectId} = require("../../utils");


async function processCheckout(userId, shop_order_ids) {
  let checkout_order = {
    totalPrice: 0,
    feeShip: 0,
    totalDiscount: 0,
    totalCheckout: 0,
  };
  let shop_order_ids_new = [];
  
  for (const shop_order_id of shop_order_ids) {
    const {shopId, shop_discounts, products} = shop_order_id;
    let checkoutPrice = 0;
    
    for (const productItem of products) {
      const {productId, quantity, variantId} = productItem;
      const product = await ProductService.get({_id: convertObjectId(productId), shop: shopId});
      
      if (!product) throw new Error(`Product ${productId} not found`);
      
      let stock = 0;
      let price = product.price;
      
      if (variantId) {
        const productVariant = await ProductVariantsService.get({
          product: convertObjectId(productId),
          _id: convertObjectId(variantId),
        });
        if (!productVariant) throw new Error(`Variant not found for product ${productId}`);
        
        stock = productVariant.stock;
        price = productVariant.price || price;
      } else {
        const productInfo = await ProductInfoService.get({product: convertObjectId(productId)});
        if (!productInfo) throw new Error(`Product variant ${variantId} not found`);
        
        stock = productInfo.stock;
        price = productInfo.price || price;
      }
      
      if (quantity > stock) throw new Error(`Insufficient stock for product ${productId}`);
      
      checkoutPrice += price * quantity;
      checkout_order.totalPrice += price * quantity;
    }
    
    const itemCheckout = {
      shopId,
      shop_discounts,
      priceRaw: checkoutPrice,
      priceApplyDiscount: checkoutPrice,
      item_products: products,
    };
    
    if (shop_discounts && shop_discounts.length > 0) {
      for (const discountItem of shop_discounts) {
        const {discount: discountAmount = 0} = await DiscountService.getDiscountAmount(
          discountItem.code,
          convertObjectId(discountItem.discountId),
          shopId,
          products
        );
        
        checkout_order.totalDiscount += discountAmount;
        if (discountAmount > 0) {
          itemCheckout.priceApplyDiscount -= discountAmount;
        }
      }
    }
    
    shop_order_ids_new.push(itemCheckout);
    checkout_order.totalCheckout += itemCheckout.priceApplyDiscount;
  }
  
  return {checkout_order, shop_order_ids_new};
  
}

module.exports = {
  processCheckout,
};