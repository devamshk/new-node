const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number, min: 0 },
  value: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
});

const details = mongoose.model("detail", Schema);

module.exports = details;
