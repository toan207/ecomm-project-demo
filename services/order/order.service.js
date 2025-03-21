const Order = require('../../schema').models.Order

async function create(data) {
  return await Order.create(data)
}

async function update(filters, data) {
  return Order.updateOne(filters, data);
}


async function get(filters) {
  return Order.findOne(filters).populate('shop', 'name logo')
}

async function list(page, limit, filters) {
  return Order.find(filters)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({createdAt: -1})
    .populate('shop', 'name logo')
}

async function count(filters) {
  return Order.countDocuments(filters);
}

module.exports = {
  create,
  update,
  get,
  list,
  count
}
