const express = require("express");
const app = express();
const mongoose = require("mongoose");
const model = require("./Model/model");
const group = require("./Model/group");
const path = require("path");
const dotenv = require("dotenv");
const pug = require("pug");

dotenv.config({ path: path.join(__dirname, "config.env") });

app.use(express.json());

mongoose.connect(
  `mongodb+srv://zorooluffy:${process.env.PASSWORD}@temp.wdyfhcc.mongodb.net/`
);

// PASSWORD="k0GDbVCnufuTKIqG"

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const save = async () => {
  const all = await model.find();
  console.log(all);
  const temp = new group({
    name: "Zoro",
    person: [...all],
    total: 0,
  });
  temp.save();
};
save();

app.get("/", async (req, res) => {
  // res.render("base");
  res.render("base");
});

app.get("/group", async (req, res) => {
  const all = await group.find();
  console.log(all);
  res.send(all);
});

// app.post("/", async (req, res) => {
//   const temp = new model(req.body);
//   await temp.save();
//   res.send("Hello World");
// });

module.exports = app;
