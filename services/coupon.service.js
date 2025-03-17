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

async function deleteCoupon(_id) {
  return Coupon.deleteOne({_id})
}

async function count(filters) {
  return Coupon.countDocuments(filters);
}

module.exports = {
  get, create, update, deleteCoupon, list, count
}
