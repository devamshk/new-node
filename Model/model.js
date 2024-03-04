const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  total: { type: Number, default: 0 },
});

const details = mongoose.model("detail", Schema);

module.exports = details;
