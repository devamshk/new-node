const express = require("express");
const app = express();
const mongoose = require("mongoose");
const model = require("./Model/model");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "config.env") });

app.use(express.json());

mongoose.connect(
  `mongodb+srv://zorooluffy:${process.env.PASSWORD}@temp.wdyfhcc.mongodb.net/`
);

// PASSWORD="k0GDbVCnufuTKIqG"

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.get("/", async (req, res) => {
  const temp = new model(req.body);
  await temp.save();
  res.send("Hello World");
});

module.exports = app;
