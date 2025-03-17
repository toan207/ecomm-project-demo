const Joi = require("joi");
const {validate} = require("../utils");

const createCouponSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  code: Joi.string().min(3).max(20).required(),
  discount: Joi.number().min(0).max(100).required(),
  slot: Joi.number().integer().min(1).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date()
    .required()
    .custom((value, helpers) => {
      const now = new Date();
      const startDate = helpers.state.ancestors[0].startDate;
      
      if (value <= now) {
        return helpers.error("any.invalid", {message: "endDate phải lớn hơn ngày hiện tại"});
      }
      
      if (value <= startDate) {
        return helpers.error("any.invalid", {message: "endDate phải lớn hơn startDate"});
      }
      
      return value;
    }),
  used: Joi.number().integer().min(1).default(1),
  minPrice: Joi.number().min(0).required(),
  appliesTo: Joi.string().valid("all", "specific").required(),
  productIds: Joi.array().items(Joi.string()).default([]).optional(),
});


const updateCouponSchema = createCouponSchema.fork(Object.keys(createCouponSchema.describe().keys), (schema) => schema.optional()).min(1);


module.exports = {
  validateCreateCoupon: validate(createCouponSchema),
  validateUpdateCoupon: validate(updateCouponSchema),
};
