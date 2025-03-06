const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  attributes: {
    type: Map,
    of: String,
    required: true,
  },
}, {timestamps: true});

module.exports = Schema;