const Joi = require("joi");
const {validate} = require("../utils");

const createProductSchema = Joi.object({
  shop: Joi.string().optional(),
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().min(0).required(),
  logo: Joi.string().required(),
  category: Joi.string().required(),
  brand: Joi.string().required(),
  variantAttributes: Joi.array().items(Joi.string()),
  info: Joi.object({
    _id: Joi.string().optional(),
    stock: Joi.number().min(0).default(0),
    description: Joi.string().min(5).max(500).required(),
    images: Joi.array().items(Joi.string()),
    video: Joi.string().allow(""),
    material: Joi.string().optional(),
    dimensions: Joi.string().optional(),
    volume: Joi.string().optional(),
    weight: Joi.string().optional(),
  }),
  variants: Joi.array().items(
    Joi.object({
      _id: Joi.string().optional(),
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
