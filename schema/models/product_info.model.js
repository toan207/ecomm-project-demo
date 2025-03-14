const e = require("express");
const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  images: {
    type: [String],
    default: [],
  },
  material: {
    type: String,
  },
  dimensions: {
    type: String,
  },
  volume: {
    type: String,
  },
  weight: {
    type: String,
  },
});

Schema.set("timestamps", true);

module.exports = Schema;
