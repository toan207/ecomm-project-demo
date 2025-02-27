const Joi = require("joi");
const {validate} = require("../utils");

const createProductSchema = Joi.object({
  shop: Joi.string().optional(),
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().min(0).required(),
  logo: Joi.string().uri().required(),
  category: Joi.string().required(),
  brand: Joi.string().required(),
  variantAttributes: Joi.array().items(Joi.string()),
  info: Joi.object({
    stock: Joi.number().min(0).default(0),
    description: Joi.string().min(5).max(500).required(),
    images: Joi.array().items(Joi.string().uri()),
    video: Joi.string().uri().allow("")
  }),
  variants: Joi.array().items(
    Joi.object({
      price: Joi.number().min(0).required(),
      stock: Joi.number().min(0).required(),
      attributes: Joi.object().pattern(Joi.string(), Joi.string()).required(),
      image: Joi.string()
    })
  ),
  status: Joi.string().valid("active", "inactive").default("active")
});

const updateProductSchema = createProductSchema.fork(Object.keys(createProductSchema.describe().keys), (schema) => schema.optional()).min(1);

module.exports = {
  validateCreateProduct: validate(createProductSchema),
  validateUpdateProduct: validate(updateProductSchema),
};
