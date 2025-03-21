const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  priceRaw: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "processing", "completed", "cancelled", 'shipping'],
    default: "pending",
  },
  discounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon'
  }],
  info: {
    name: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    note: {type: String},
  },
});

Schema.set("timestamps", true);

module.exports = Schema;
