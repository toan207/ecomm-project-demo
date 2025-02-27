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
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive"],
  },
  imgaes: {
    type: [String],
    default: [],
  },
  video: {
    type: String,
    default: "",
  },
});

Schema.set("timestamps", true);

module.exports = Schema;
