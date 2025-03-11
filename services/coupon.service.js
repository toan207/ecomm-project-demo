const Coupon = require('../schema').models.Coupon

async function get(_id) {
  return Coupon.findOne({_id})
}

async function update() {
}

async function create() {
}

async function deleteCoupon() {
}

module.exports = {
  get, create, update, deleteCoupon
}
