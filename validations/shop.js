const Joi = require("joi");
const {validate} = require("../utils");

const createShopSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  address: Joi.string().required(),
  banner: Joi.string().required(),
  avatar: Joi.string().required(),
})

module.exports = {
  validateCreateShop: validate(createShopSchema),
};
