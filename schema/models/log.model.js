const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  type: {type: String, required: true},
  action: {type: String, required: true},
  dataOld: {type: String, default: ""},
  dataNew: {type: String, default: ""},
  description: {type: String, default: ""},
  createBy: {type: mongoose.Schema.Types.ObjectId, ref: "Account"},
});

Schema.set("timestamps", true);

module.exports = Schema;
