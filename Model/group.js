const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  name: { type: String },
  email: String,
  total: { type: Number, default: 0 },
});

const Schema = new mongoose.Schema({
  name: String,
  person: [modelSchema],
  total: Number,
});

const groups = new mongoose.model("group", Schema);

module.exports = groups;
