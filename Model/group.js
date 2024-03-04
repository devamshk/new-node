const mongoose = require("mongoose");
const model = require("./model");

const Schema = new mongoose.Schema({
  name: String,
  person: [model],
  total: Number,
});
