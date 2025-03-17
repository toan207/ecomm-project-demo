const Shop = require('../schema').models.Shop

async function add(data, userId) {
  return await Shop.create({
    ...data,
    owner: userId
  })
}

async function update(_id, data) {
  return Shop.findOneAndUpdate({_id}, data, {new: true, upsert: true})
}

async function get(_id) {
  return Shop.findOne({_id})
}

async function count(filters) {
  return Shop.countDocuments(filters)
}

async function list(page, limit, filters) {
  return Shop.find(filters).skip((page - 1) * limit).limit(limit).populate('owner', 'name')
}

async function info(userId) {
  return Shop.findOne({owner: userId})
}

module.exports = {
  add,
  update,
  get,
  count,
  list, info
}