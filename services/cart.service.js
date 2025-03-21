const Cart = require('../schema').models.Cart

const mongoose = require("mongoose");

async function add(account, data) {
  const {product, quantity, variant} = data;
  
  const variantId = variant && mongoose.Types.ObjectId.isValid(variant) ? variant : null;
  
  const cart = await Cart.findOne({account});
  
  if (!cart) {
    return Cart.create({
      account,
      products: [{product, quantity, variant: variantId}],
    });
  }
  
  const existingProduct = cart['products'].find(
    (item) => String(item.product) === String(product) && String(item.variant || "") === String(variantId || "")
  );
  
  if (existingProduct) {
    return Cart.updateOne(
      {account, "products.product": product, "products.variant": variantId},
      {$inc: {"products.$.quantity": quantity}}
    );
  } else {
    return Cart.updateOne(
      {account},
      {$push: {products: {product, quantity, variant: variantId}}}
    );
  }
}


async function update(account, data) {
  const {product, quantity, variant} = data;
  
  const variantId = variant && mongoose.Types.ObjectId.isValid(variant) ? variant : null;
  
  if (quantity === 0) {
    return Cart.findOneAndUpdate(
      {account},
      {$pull: {products: {product, variant: variantId}}},
      {new: true}
    );
  }
  
  return Cart.findOneAndUpdate(
    {account, "products.product": product, "products.variant": variantId},
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
    .populate('products.product', "name price ")
    .populate('products.variant', "price attributes");
}

async function getOne(filter) {
  return Cart.findOne(filter)
}

async function count(account) {
  const cart = await Cart.aggregate([
    {$match: {account}},
    {$project: {totalProducts: {$size: "$products"}}}
  ]);
  
  return cart.length > 0 ? cart[0].totalProducts : 0;
}


module.exports = {
  add, update, remove, reset, get, count, getOne
}