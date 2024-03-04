const express = require("express");
const app = express();
const mongoose = require("mongoose");
const model = require("./Model/model");
const group = require("./Model/group");
const path = require("path");
const dotenv = require("dotenv");
const pug = require("pug");
const cors = require("cors");
dotenv.config({ path: path.join(__dirname, "config.env") });

const my = require("./sort");

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
app.use(cors());
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

app.get("/", async (req, res) => {
  // res.render("base");
  res.render("base");
});
app.post("/", async (req, res) => {
  const data = req.body;
  console.log(data);
  const temp = new model(data);
  temp.save();
  res.send("Data Saved");
});

app.get("/cost", async (req, res) => {
  const people = await model.find();
  res.render("every", { people });
});
app.post("/cost", async (req, res) => {
  const data = req.body;
  console.log(data);
  for (let i = 0; i < data.people.length; i++) {
    const actual = data.amount / data.count;
    if (data.people[i] != data.person) {
      const guy = await model.findOne({ name: data.people[i] });
      const temp = guy.value - actual;
      guy.value = temp;
      guy.total += actual;
      await guy.save();
    } else if (data.people[i] == data.person) {
      const guy = await model.findOne({ name: data.people[i] });
      const temp = guy.value + actual * (data.count - 1);
      guy.value = temp;
      guy.total += actual;
      await guy.save();
    }
  }
  res.send("every");
});

app.get("/details", async (req, res) => {
  const people = await model.find();
  res.render("details", { people });
});

app.get("/split", async (req, res) => {
  const people = await model.find().select("value name");
  const temp = new my((a, b) => a.value - b.value);
  for (let one of people) {
    temp.add({ cost: one.value, name: one.name });
  }
  while (temp.length() > 0) {
    const first = temp.first();
    const last = temp.last();
    const cost = Math.min(Math.abs(first.cost), Math.abs(last.cost));
    // first.cost += cost;
    // last.cost -= cost;
    if (first.cost + cost == 0) {
      temp.delete(first);
    } else if (last.cost - cost == 0) {
      temp.delete(last);
    }
    console.log(`${first.name} pays ${cost} to ${last.name}`);
  }
  res.render("split", { people });
});

module.exports = app;
