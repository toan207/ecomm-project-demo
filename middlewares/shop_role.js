const Shop = require('../schema').models.Shop

module.exports = async (req, res, next) => {
  if (req.user) {
    const shop = await Shop.findOne({owner: req.user._id}, '_id owner');
    if (shop && String(shop['owner']) === String(req.user._id)) {
      req.shopId = shop['_id'];
      return next();
    }
  }
  return res.json({success: false, message: 'Shop role is required!'});
}