require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { first, rearg } = require("lodash");
const app = express();
var isUserLoggedIn = false;
var userFirstName = "";
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/manpowerDB");

// Registration Section
const registerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  service: String,
  mobileNumber: Number,
  age: Number,
  rate: String,
  speciality: String,
  availableHours: String,
  password: String,
  confirmPassword: String,
});
const Register = mongoose.model("Register", registerSchema);
app.post("/register", (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    service,
    mobileNumber,
    age,
    rate,
    speciality,
    availableHours,
    password,
    confirmPassword,
  } = req.body;

  if (password === confirmPassword && firstName && lastName && gender && service && mobileNumber && age && speciality && availableHours) {
    const newRegister = new Register({
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      service: service,
      mobileNumber: mobileNumber,
      age: age,
      rate: rate,
      speciality: speciality,
      availableHours: availableHours,
      password: password,
      confirmPassword: confirmPassword,
    });
    newRegister.save();
  }
  res.redirect("/");
});

// Signup Section
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobileNumber: Number,
  password: String,
  confirmPassword: String,
});
const User = mongoose.model("User", userSchema);
app.post("/signup", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
    confirmPassword,
  } = req.body;
  if (password === confirmPassword) {
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      password: password,
      confirmPassword: confirmPassword,
    });
    newUser.save();
  }

  res.redirect("/");
});

// Login Section
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.find(
    {
      email: email,
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (password === result[0].password) {
          isUserLoggedIn = true;
          userFirstName = result[0].firstName;
          res.redirect("/");
        } else {
          //password incorrect
          console.log("Password Incorrect");
          res.redirect("/login");
        }
      }
    }
  );

  // res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index", {
    firstName: userFirstName,
    isUserLoggedIn: isUserLoggedIn,
  });
});
app.get("/:service", (req, res) => {
  const service = req.params.service;
  if (service === "login") {
    res.render("login", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "signup") {
    res.render("signup", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "logout") {
    isUserLoggedIn = false;
    userFirstName = "";
    res.redirect("/");
  }
  if (service === "register") {
    res.render("register", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "cooking") {
    res.render("pages/cooking", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "cleaning") {
    res.render("pages/cleaning", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "nurse") {
    res.render("pages/nurse", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "baby-sitter") {
    res.render("pages/baby-sitter", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "laundary") {
    res.render("pages/laundary", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "water-cane-supply") {
    res.render("pages/water-cane-supply", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "grocery-delivery") {
    res.render("pages/grocery-delivery", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "trailor") {
    res.render("pages/trailor", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "burtician") {
    res.render("pages/burtician", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "meat-delivery") {
    res.render("pages/meat-delivery", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "tutor") {
    res.render("pages/service-not-found", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
  if (service === "tiffin-services") {
    res.render("pages/tiffin-services", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
    });
  }
});

app.post(
  "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBYQigCYpTDA190O1pmQVrT0_4dvBhVPYk",
  (req, res) => {
    res.send(res);
  }
);

app.listen(3000, () => {
  console.log("server started at port 3000");
});
