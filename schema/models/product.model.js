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
  price: {
    type: Number,
    required: true,
    default: 0
  },
  logo: {
    type: String,
    required: true,
  },
  ratings: {
    count: {
      type: Number,
      default: 0,
    },
    average: {
      type: Number,
      default: 0,
    },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  variantAttributes: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive"],
  },
  delete: {
    type: Boolean,
    default: false,
  },
});

Schema.set("timestamps", true);

Schema.pre("remove", async function (next) {
  await this.model("ProductInfo").deleteMany({product: this._id});
  await this.model("ProductVariants").deleteMany({product: this._id});
  next();
});

module.exports = Schema;
