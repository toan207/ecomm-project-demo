const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
  },
  avatar: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

Schema.set("timestamps", true);

module.exports = Schema;
