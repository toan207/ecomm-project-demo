const OrderService = require('../services/order/order.service')
const OrderItemService = require('../services/order/order-item.service')
const ProductService = require('../services/product/product.service')
const ProductInfoService = require('../services/product/product-info.service')
const ProductVariantsService = require('../services/product/product-variants.service')
const DiscountService = require('../services/coupon.service')
const CartService = require('../services/cart.service')
const {Paging} = require("../model/paging");
const {Success} = require("../model/base-message");
const {ResponseLib} = require("../lib/response.lib");
const {convertObjectId} = require('../utils')
const {processCheckout} = require('../services/repo/order.repository')

async function update(req, res) {
  try {
    const {_id} = req.params;
    const {status} = req.body;
    const shopId = req.shopId;
    
    const updatedOrder = await OrderService.update(
      {_id, shop: shopId},
      {status}
    );
    
    if (!updatedOrder) {
      return res.status(404).json({message: "Order not found or update failed"});
    }
    
    return res.status(200).json({message: "Order updated successfully", updatedOrder});
  } catch (error) {
    return res.status(500).json({message: "Internal server error", error});
  }
}

async function get(req, res) {
  const {_id} = req.params;
  const order = await OrderService.get({_id, account: req.user._id});
  const orderItem = await OrderItemService.list({order: order['_id']})
  const result = Success();
  ResponseLib(res, result.code, result.message, {
    data: {
      order,
      orderItem
    }
  });
}

async function list(req, res) {
  const userId = req.user._id;
  const {page = 1, limit = 10, status} = req.query
  const filters = {
    account: String(userId),
    status
  }
  
  const orders = await OrderService.list(page, limit, filters);
  const count = await OrderService.count(filters);
  
  const paging = Paging(page, limit, count);
  const result = Success();
  
  ResponseLib(res, result.code, result.message, {
    data: orders, paging
  });
}

async function cancelOrder(req, res) {
  try {
    const {_id} = req.params;
    const {status} = req.body;
    const userId = req.user._id;
    
    const order = await OrderService.get({_id, account: userId});
    
    if (!order) {
      return res.status(404).json({message: "Order not found"});
    }
    
    if (order['status'] === "pending" || order['status'] === "processing") {
      const update = await OrderService.update(
        {_id, account: userId},
        {status}
      );
      if (!update) return res.status(500).json({message: "Failed to update order"});
      return res.status(200).json({message: "Order status updated", update});
    }
    
    return res.status(400).json({message: "Order cannot be canceled"});
  } catch (error) {
    return res.status(500).json({message: "Internal server error", error});
  }
}

async function checkoutReview(req, res) {
  try {
    const {cardId, shop_order_ids} = req.body;
    const userId = req.user._id;
    const {checkout_order, shop_order_ids_new} = await processCheckout(userId, shop_order_ids);
    
    return res.status(200).json({
      message: "Checkout review successful",
      checkout_order,
      shop_order_ids,
      shop_order_ids_new,
    });
    
  } catch (error) {
    return res.status(500).json({message: `Internal server error ${error.message}`});
  }
}

async function checkout(req, res) {
  try {
    const {cardId, shop_order_ids} = req.body;
    const userId = req.user._id;
    const cart = await CartService.getOne({account: userId}) ? true : false
    
    const {checkout_order, shop_order_ids_new} = await processCheckout(userId, shop_order_ids);
    
    for (const order of shop_order_ids_new) {
      const orderCreate = await OrderService.create({
        account: userId,
        shop: order.shopId,
        totalPrice: order.priceApplyDiscount,
        priceRaw: order.priceRaw,
        discounts: order.shop_discounts.map(item => item.discountId)
      })
      for (const product of order.item_products) {
        const orderItem = await OrderItemService.create({
          order: orderCreate._id,
          product: product.productId,
          variant: product.variantId,
          quantity: product.quantity,
          price: product.price
        });
        await CartService.remove(userId, product.productId);
      }
    }
    
    return res.status(200).json({
      message: "Checkout successful",
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Internal server error", error});
  }
}

module.exports = {
  update,
  get,
  cancelOrder,
  list,
  checkoutReview,
  checkout
}