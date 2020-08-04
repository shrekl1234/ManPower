require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});


app.get("/:service", (req, res) => {
  const service = req.params.service;
  if (service === "login") {
    res.render("login");
  }
  if (service === "signup") {
    res.render("signup");
  }
  if (service === "register") {
    res.render("register");
  }
  if (service === "cooking") {
    res.render("pages/cooking");
  }
  if (service === "cleaning") {
    res.render("pages/cleaning");
  }
  if (service === "nurse") {
    res.render("pages/nurse");
  }
  if (service === "baby-sitter") {
    res.render("pages/baby-sitter");
  }
  if (service === "laundary") {
    res.render("pages/laundary");
  }
  if (service === "water-cane-supply") {
    res.render("pages/water-cane-supply");
  }
  if (service === "grocery-delivery") {
    res.render("pages/grocery-delivery");
  }
  if (service === "trailor") {
    res.render("pages/trailor");
  }
  if (service === "burtician") {
    res.render("pages/burtician");
  }
  if (service === "meat-delivery") {
    res.render("pages/meat-delivery");
  }
  if (service === "tutor") {
    res.render("pages/service-not-found");
  }
  if (service === "tiffin-services") {
    res.render("pages/tiffin-services");
  }else{
      res.render("pages/service-not-found");
  }
});
app.listen(3000, () => {
  console.log("server started at port 3000");
});
