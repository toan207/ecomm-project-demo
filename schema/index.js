const mongoose = require("mongoose");
const configs = require('../configs');

const db = mongoose.createConnection(configs.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.model('Account', require('./models/account.model'));
db.model('Address', require('./models/address.model'));
db.model('Banner', require('./models/banner.model'));
db.model('Brand', require('./models/brand.model'));
db.model('Cart', require('./models/cart.model'));
db.model('Category', require('./models/category.model'));
db.model('Coupon', require('./models/coupon.model'));
db.model('Log', require('./models/log.model'));
db.model('OrderItem', require('./models/order_item.model'));
db.model('Order', require('./models/order.model'));
db.model('Payment', require('./models/payment.model'));
db.model('ProductInfo', require('./models/product_info.model'));
db.model('ProductVariants', require('./models/product_variants.model'));
db.model('Product', require('./models/product.model'));
db.model('Review', require('./models/review.model'));
db.model('Session', require('./models/session.model'));
db.model('Shop', require('./models/shop.model'));
db.model('Vietnam', require('./models/vietnam.model'));


module.exports = db;
