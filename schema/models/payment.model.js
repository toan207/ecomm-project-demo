const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  method: {
    type: String,
    enum: ["cash", "card"],
    required: true,
  },
  transactionId: {
    type: String,
  },
});

Schema.set("timestamps", true);

module.exports = Schema;
