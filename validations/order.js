const Joi = require("joi");
const {validate} = require("../utils");

const checkoutPreview = Joi.object({
  cardId: Joi.string().optional().allow(""),
  shop_order_ids: Joi.array()
    .items(
      Joi.object({
        shopId: Joi.string().required(),
        shop_discounts: Joi.array()
          .items(
            Joi.object({
              discountId: Joi.string().required(),
              code: Joi.string().required(),
            })
          )
          .optional(),
        products: Joi.array()
          .items(
            Joi.object({
              productId: Joi.string().required(),
              quantity: Joi.number().integer().min(1).required(),
              variantId: Joi.string().optional().allow(""),
              price: Joi.number().required(),
            })
          )
          .required(),
      })
    )
    .min(1)
    .required(),
});

const checkout = Joi.object({
  info: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    note: Joi.string().optional().allow(""),
  }).required(),
  shop_order_ids: Joi.array()
    .items(
      Joi.object({
        shopId: Joi.string().required(),
        shop_discounts: Joi.array()
          .items(
            Joi.object({
              discountId: Joi.string().required(),
              code: Joi.string().required(),
            })
          )
          .optional(),
        products: Joi.array()
          .items(
            Joi.object({
              productId: Joi.string().required(),
              quantity: Joi.number().integer().min(1).required(),
              variantId: Joi.string().optional().allow(""),
              price: Joi.number().required(),
            })
          )
          .required(),
      })
    )
    .min(1)
    .required(),
  cardId: Joi.string().optional().allow(""),
});

const updateOrderSchema = Joi.object({
  status: Joi.string().valid("pending", "processing", 'shipping', "completed", "cancelled").required(),
});

const userUpdateOderSchema = Joi.object({
  status: Joi.string().valid("cancelled").required(),
})

module.exports = {
  validateCreateOrder: validate(checkoutPreview),
  validateCheckout: validate(checkout),
  validateUpdateOrder: validate(updateOrderSchema),
  validateUserUpdateOrder: validate(userUpdateOderSchema),
};