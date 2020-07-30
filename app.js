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


app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/cooking", (req, res) => {
  res.render("pages/cooking");
});

app.get("/cleaning", (req, res) => {
  res.render("pages/service-not-found");
});


app.listen(3000, ()=>{
    console.log("server started at port 3000");
});