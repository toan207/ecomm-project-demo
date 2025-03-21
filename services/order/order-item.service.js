const OrderItem = require('../../schema').models.OrderItem


async function create(data) {
  return await OrderItem.create(data)
}

async function list(filters) {
  return OrderItem.find(filters)
    .sort({createdAt: -1})
    .populate('product', 'name logo')
    .populate('variant', 'attributes')
}


module.exports = {
  create,
  list,
}
