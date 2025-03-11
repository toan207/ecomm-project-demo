const Log = require('../schema').models.Log

const Action = {
  ACCOUNT: "account",
  SHOP: (id = '') => !!id ? `shop-${id}` : 'shop',
  PRODUCT: (id = '') => !!id ? `product-${id}` : 'product',
  ORDER: (id = '') => !!id ? `order-${id}` : 'order',
  PAYMENT: "payment",
  CATEGORY: "category",
  AUTH: "auth",
  COUPON: "coupon",
  REVIEW: "review",
  CART: "cart",
  BRAND: "brand",
  BANNER: "banner",
};


const LogType = {
  CREATE: "create",
  UPDATE: 'update',
  DELETE: "delete",
  HIDE: "hide",
  
  register_account: "register_account",
  verify_email: "verify_email",
  login: "login",
  login_via_google: "login_via_google",
  
  cart_add_item: "cart_add_item",
  cart_remove_item: "cart_remove_item",
  cart_update_quantity: "cart_update_quantity",
}


async function addLog(type, action, createBy, dataOld = '', dataNew = '', description = '') {
  await Log.create({type, action, createBy, dataOld, dataNew, description})
}

async function list(filter) {
}


module.exports = {
  addLog, list, LogType, Action
}