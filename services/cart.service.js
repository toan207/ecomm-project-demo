const Cart = require('../schema').models.Cart

async function add(account, data) {
  const {product, quantity, variant} = data;
  
  const cart = await Cart.findOne({account})
  if (!cart) {
    return Cart.create({
      account,
      products: [{product, quantity, variant}]
    })
  } else {
    return Cart.updateOne({account}, {
      $push: {products: {product, quantity, variant}}
    })
  }
}

async function update(account, data) {
  const {product, quantity, variant} = data;
  
  if (quantity === 0) {
    return Cart.findOneAndUpdate(
      {account},
      {$pull: {products: {product, variant}}},
      {new: true}
    );
  }
  
  return Cart.findOneAndUpdate(
    {account, "products.product": product, "products.variant": variant},
    {$set: {"products.$.quantity": quantity}},
    {new: true}
  );
}

async function reset(account) {
  return Cart.deleteOne({account})
}

async function remove(account, product) {
  const cart = await Cart.findOne({account})
  if (!cart) throw new Error("Cart not found")
  
  await Cart.updateOne({account}, {
    $pull: {products: {product}}
  });
}

async function get(filter, page, limit) {
  return Cart.findOne(filter)
    .select({products: {$slice: [(page - 1) * limit, limit]}})
    .populate('products.product', "name price logo")
    .populate('products.variant', "price attributes");
}

async function getOne(filter) {
  return Cart.findOne(filter)
}

async function count(account) {
  const cart = await Cart.findOne({account}).select({totalProducts: {$size: "$products"}});
  
  return cart ? cart['totalProducts'] : 0;
}


module.exports = {
  add, update, remove, reset, get, count, getOne
}