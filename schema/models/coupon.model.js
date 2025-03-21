const e = require("express");
const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  slot: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minPrice: {
    type: Number,
    required: true,
  },
  appliesTo: {
    type: String,
    required: true,
    enum: ['all', 'specific'],
    default: 'all'
  },
  productIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    default: [],
  },
  delete: {
    type: Boolean,
    default: false
  }
});

Schema.set("timestamps", true);

module.exports = Schema;
