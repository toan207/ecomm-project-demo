const Joi = require("joi");
const {validate} = require("../utils");

const addToCartSchema = Joi.object({
  product: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  variant: Joi.string().optional().allow(""),
})

module.exports = {
  validateAddToCart: validate(addToCartSchema),
};
