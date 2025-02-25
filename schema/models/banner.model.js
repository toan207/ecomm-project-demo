const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  image: { type: String, default: "" },
  order: { type: Number, default: 0 },
  hide: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
});

Schema.set("timestamps", true);

Schema.pre("save", async function (next) {
  const lastDoc = await this.constructor.findOne().sort({ order: -1 });
  this.order = lastDoc ? lastDoc.order + 1 : 1;
  next();
});

module.exports = Schema;
