const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
// const axios = require("axios");

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public" + "/assets"));
app.use(express.json());

app.get("/", (_req, res) => {
  res.render("home");
});

app.get("/status", (_req, res) => {
  const status = axios.get(
    `http://dataservice.accuweather.com/locations/v1/regions?${process.env.API_KEY}`
  );
  res.send(status);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`On port ${port}`);
});
