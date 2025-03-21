const Coupon = require('../schema').models.Coupon

async function get(filters) {
  return Coupon.findOne(filters)
}

async function list(page, limit, filters) {
  return Coupon.find(filters).skip((page - 1) * limit).limit(limit).sort({createdAt: -1})
}

async function update(_id, data) {
  return Coupon.updateOne({_id}, data, {new: true, upsert: true})
}

async function create(data) {
  return Coupon.create(data)
}

async function count(filters) {
  return Coupon.countDocuments(filters);
}

async function getDiscountAmount(code, _id, shop, products) {
  const coupon = await get({_id, code, shop});
  if (!coupon || coupon['delete']) {
    throw new Error('Invalid coupon code') ;
  }
  const {discount, slot, startDate, endDate, minPrice, appliesTo} = coupon;
  if (slot <= 0) {
    throw new Error('Coupon code is no longer available');
  }
  if (new Date() < startDate || new Date() > endDate) {
    return 'Coupon code is expired';
  }
  const totalPrice = products.reduce((acc, product) => acc + (product.price || 0) * product.quantity, 0);
  if (totalPrice < minPrice) {
    throw new Error(`Minimum price requirement of ${minPrice} not met`);
  }
  
  if (appliesTo === 'specific') {
    if (!products.every(product => coupon['productIds'].includes(product["productId"]))) {
      return 'Coupon code is not applicable to the selected products';
    }
  }
  
  const amount = (discount / 100) * totalPrice;
  return {
    totalOrder: totalPrice,
    discount: amount,
    totalPrice: totalPrice - amount
  }
}

async function validate(filters) {

}


module.exports = {
  get, create, update, list, count, validate, getDiscountAmount
}
