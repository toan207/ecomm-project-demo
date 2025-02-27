const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  default: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

Schema.set("timestamps", true);

Schema.pre("save", async function (next) {
  if (this.isNew) {
    const count = await this.model("Address").countDocuments({
      account: this.account,
    });
    if (count === 0) {
      this.default = true;
    }
  }
  next();
});

module.exports = Schema;
