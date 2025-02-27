const e = require("express");
const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
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
  expire: {
    type: Date,
    required: true,
  },
});

Schema.set("timestamps", true);

module.exports = Schema;
