require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { first, rearg, result } = require("lodash");
const app = express();
var isUserLoggedIn = false;
var userFirstName = "";
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 
// var Bufs = require('bufs');
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
  profilePhoto: {
    data: Buffer,
    contentType: String,
  },
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

  if (
    password === confirmPassword &&
    firstName &&
    lastName &&
    gender &&
    service &&
    mobileNumber &&
    age &&
    speciality &&
    availableHours
  ) {
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
      profilePhoto: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.body.profilePhoto)
        ),
        ffer,
        contentType: "image/png",
      },
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

const cardSchema = new mongoose.Schema({
  cardTitle: String,
  noOfServiceFound: Number,
  minimumPrice: Number,
  profession: String,
  professionImage: String 
});

const Card = mongoose.model("Card", cardSchema);
// adding card Title and number of service found

const cooking = new Card({
  cardTitle: "cooking",
  noOfServiceFound: 4,
  minimumPrice: 299,
  profession: "Cook",
  professionImage: "https://image.flaticon.com/icons/svg/3058/3058973.svg"
});
// cooking.save();
const cleaning = new Card({
  cardTitle: "cleaning",
  noOfServiceFound: 4,
  minimumPrice: 299,
  profession: "Cleaner",
  professionImage: "https://image.flaticon.com/icons/svg/3030/3030786.svg"
});
// cleaning.save();
const nurse = new Card({
  cardTitle: "nurse",
  noOfServiceFound: 4,
  minimumPrice: 299,
  profession: "Nurse",
  professionImage: "https://image.flaticon.com/icons/svg/3011/3011274.svg"
});
// nurse.save();
const baby_sitter = new Card({
  cardTitle: "baby-sitter",
  noOfServiceFound: 4,
  minimumPrice: 299,
  profession: "Baby-Sitter",
  professionImage: "https://image.flaticon.com/icons/svg/83/83079.svg"
});
// baby_sitter.save();

const laundary = new Card({
  cardTitle: "laundary",
  noOfServiceFound: 4,
  minimumPrice: 299,
  profession: "Laundary",
  professionImage: "https://image.flaticon.com/icons/svg/1010/1010284.svg"
});
// laundary.save();
const water_cane_supply = new Card({
  cardTitle: "water-cane-supply",
  noOfServiceFound: 4,
  minimumPrice: 299,
  profession: "Water Cane Supply",
  professionImage: "https://image.flaticon.com/icons/svg/1185/1185736.svg"
});
// water_cane_supply.save();
const grocery_delivery = new Card({
  cardTitle: "grocery-delivery",
  noOfServiceFound: 4,
  minimumPrice: 299,
  profession: "Grocery Delivery",
  professionImage:"https://www.flaticon.com/premium-icon/icons/svg/869/869449.svg"
});
// grocery_delivery.save();

const trailor = new Card({
  cardTitle: "trailor",
  noOfServiceFound: 4,
  minimumPrice: 299,
  profession: "Trailor",
  professionImage: "https://image.flaticon.com/icons/svg/3209/3209505.svg"
});
// trailor.save();
const buetician = new Card({
  cardTitle: "buetician",
  noOfServiceFound: 4,
  minimumPrice: 299,
  profession: "Buetician",
  professionImage: "https://www.flaticon.com/premium-icon/icons/svg/2859/2859583.svg"
});
// buetician.save();

const meat_delivery = new Card({
  cardTitle: "meat-delivery",
  noOfServiceFound: 4,
  minimumPrice: 299,
  profession: "Meat Delivery",
  professionImage: "https://www.flaticon.com/premium-icon/icons/svg/1532/1532685.svg"
});
// meat_delivery.save();
const tutor = new Card({
  cardTitle: "tutor",
  noOfServiceFound: 4,
  minimumPrice: 299,
  profession: "Tutor",
  professionImage: "https://www.flaticon.com/premium-icon/icons/svg/3200/3200684.svg"
});
// tutor.save();

const tiffin_services = new Card({
  cardTitle: "tiffin-services",
  noOfServiceFound: 4,
  minimumPrice: 299,
  profession: "Tiffin Services",
  professionImage: "https://www.flaticon.com/premium-icon/icons/svg/1019/1019680.svg"
});
// tiffin_services.save();

app.get("/", (req, res) => {
  Card.find({}, (err, result) => {
    if (!err) {
      res.render("index", {
        firstName: userFirstName,
        isUserLoggedIn: isUserLoggedIn,
        cardData: result,
      });
    } else {
      console.log(err);
    }
  });
});

app.get("/service-not-found",(req,res)=>{
  res.render("pages/service-not-found", {
    firstName: userFirstName,
    isUserLoggedIn: isUserLoggedIn,
  });
});

const profSchema = new mongoose.Schema({
 profilePhoto: String,
 name: String,
 gender: String,
 age: Number,
 speciality: String,
 workOffered :String,
 phone: Number
});

const Cook = mongoose.model("Cook", profSchema);

const cook1 = new Cook({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Aditi Musunur",
  gender: "female",
  age: 20,
  speciality: "Specialed in North Indian Food",
  workOffered:
    "Morning/Evening. Rate 1000/- per person, Includes cooking & cleaning kitchenware",
  phone: "0123456789",
});

// cook1.save();

const cook2 = new Cook({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Jitendra Choudhary",
  gender: "male",
  age: 20,
  speciality: "Specialed in Souc=th Indian Food",
  workOffered:
    "Morning/Evening. Rate 5000/- per person, Includes cooking & cleaning kitchenware",
  phone: "0123456789",
});
// cook2.save();

const Cleaner = mongoose.model("Cleaner", profSchema);

const cleaner1 = new Cleaner({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Aditi Musunur",
  gender: "female",
  age: 20,
  speciality: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// cleaner1.save();
const cleaner2 = new Cleaner({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Jitendra Choudhary",
  gender: "male",
  age: 20,
  speciality: "SLorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});
// cleaner2.save();

const Nurse = mongoose.model("Nurse", profSchema);

const nurse1 = new Nurse({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Jitendra Choudhary",
  gender: "male",
  age: 20,
  speciality: "SLorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// nurse1.save();
const BabySitter = mongoose.model("BabySitter", profSchema);

const babySitter1 = new BabySitter({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Jitendra Choudhary",
  gender: "male",
  age: 20,
  speciality: "SLorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// babySitter1.save();
const babySitter2 = new BabySitter({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Aditi Musunur",
  gender: "female",
  age: 20,
  speciality: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// babySitter2.save();

const Laundary = mongoose.model("Laundary", profSchema);

const laundary1 = new Laundary({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Jitendra Choudhary",
  gender: "male",
  age: 20,
  speciality: "SLorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// laundary1.save();
const laundary2 = new Laundary({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Aditi Musunur",
  gender: "female",
  age: 20,
  speciality: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// laundary2.save();

const WaterCaneSupply = mongoose.model("WaterCaneSupply", profSchema);

const waterCaneSupply1 = new WaterCaneSupply({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Jitendra Choudhary",
  gender: "male",
  age: 20,
  speciality: "SLorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// waterCaneSupply1.save();
const waterCaneSupply2 = new WaterCaneSupply({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Aditi Musunur",
  gender: "female",
  age: 20,
  speciality: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// waterCaneSupply2.save();

const Grocery = mongoose.model("Grocery", profSchema);

const grocery1 = new Grocery({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Jitendra Choudhary",
  gender: "male",
  age: 20,
  speciality: "SLorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// grocery1.save();
const grocery2 = new Grocery({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Aditi Musunur",
  gender: "female",
  age: 20,
  speciality: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// grocery2.save();

const Trailor = mongoose.model("Trailor", profSchema);

const trailor1 = new Trailor({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Jitendra Choudhary",
  gender: "male",
  age: 20,
  speciality: "SLorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// trailor1.save();
const trailor2 = new Trailor({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Aditi Musunur",
  gender: "female",
  age: 20,
  speciality: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// trailor2.save();

const Buetician = mongoose.model("Buetician", profSchema);

const buetician1 = new Buetician({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Jitendra Choudhary",
  gender: "male",
  age: 20,
  speciality: "SLorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// buetician1.save();
const buetician2 = new Buetician({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Aditi Musunur",
  gender: "female",
  age: 20,
  speciality: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// buetician2.save();

const MeatDelivery = mongoose.model("MeatDelivery", profSchema);

const meatDelivery1 = new MeatDelivery({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Jitendra Choudhary",
  gender: "male",
  age: 20,
  speciality: "SLorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// meatDelivery1.save();
const meatDelivery2 = new MeatDelivery({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Aditi Musunur",
  gender: "female",
  age: 20,
  speciality: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// meatDelivery2.save();
const Tutor = mongoose.model("Tutor", profSchema);

const tutor1 = new Tutor({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Jitendra Choudhary",
  gender: "male",
  age: 20,
  speciality: "SLorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// tutor1.save();
const tutor2 = new Tutor({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Aditi Musunur",
  gender: "female",
  age: 20,
  speciality: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// tutor2.save();

const TiffinService = mongoose.model("TiffinService", profSchema);

const tiffinService1 = new TiffinService({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Jitendra Choudhary",
  gender: "male",
  age: 20,
  speciality: "SLorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// tiffinService1.save();
const tiffinService2 = new TiffinService({
  profilePhoto: "https://image.flaticon.com/icons/svg/2919/2919600.svg",
  name: "Aditi Musunur",
  gender: "female",
  age: 20,
  speciality: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  workOffered:
    "Aenean ullamcorper lorem sed libero tristique, non ultricies erat pellentesque.",
  phone: "0123456789",
});

// tiffinService2.save();
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
    Cook.find({},(err, result)=>{
      if(!err){
        if(!result.length){
        res.redirect("/service-not-found");
        }else{
           res.render("pages/cooking", {
             firstName: userFirstName,
             isUserLoggedIn: isUserLoggedIn,
             cookData: result,
           });
        }       
      }else{
        console.log(err);
      }
    });
   
  }
  if (service === "cleaning") {
    
     Cleaner.find({}, (err, result) => {
       if (!err) {
         if (!result.length) {
           res.redirect("/service-not-found");
         } else {
            res.render("pages/cleaning", {
              firstName: userFirstName,
              isUserLoggedIn: isUserLoggedIn,
              cleanerData: result
            });
         }
       } else {
         console.log(err);
       }
     });

    
    
    
    
  }
  if (service === "nurse") {
     Nurse.find({}, (err, result) => {
       if (!err) {
         if (!result.length) {
           res.redirect("/service-not-found");
         } else {
            res.render("pages/nurse", {
              firstName: userFirstName,
              isUserLoggedIn: isUserLoggedIn,
              nurseData: result
            });
         }
       } else {
         console.log(err);
       }
     });



   
  }
  if (service === "baby-sitter") {
     BabySitter.find({}, (err, result) => {
       if (!err) {
         if (!result.length) {
           res.redirect("/service-not-found");
         } else {
            res.render("pages/baby-sitter", {
              firstName: userFirstName,
              isUserLoggedIn: isUserLoggedIn,
              babySitterData: result
            });
         }
       } else {
         console.log(err);
       }
     });


   
  }
  if (service === "laundary") {
     Laundary.find({}, (err, result) => {
       if (!err) {
         if (!result.length) {
           res.redirect("/service-not-found");
         } else {
    res.render("pages/laundary", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
      laundaryData: result
    });
         }
       } else {
         console.log(err);
       }
     });


  }
  if (service === "water-cane-supply") {
     WaterCaneSupply.find({}, (err, result) => {
       if (!err) {
         if (!result.length) {
           res.redirect("/service-not-found");
         } else {
          res.render("pages/water-cane-supply", {
            firstName: userFirstName,
            isUserLoggedIn: isUserLoggedIn,
            waterCaneSupplyData: result
          });
         }
       } else {
         console.log(err);
       }
     });


    
  }
  if (service === "grocery-delivery") {
     Grocery.find({}, (err, result) => {
       if (!err) {
         if (!result.length) {
           res.redirect("/service-not-found");
         } else {
           res.render("pages/grocery-delivery", {
             firstName: userFirstName,
             isUserLoggedIn: isUserLoggedIn,
             groceryDeliveryData: result
           });
         }
       } else {
         console.log(err);
       }
     });



   
  }
  if (service === "trailor") {
     Trailor.find({}, (err, result) => {
       if (!err) {
         if (!result.length) {
           res.redirect("/service-not-found");
         } else {
            res.render("pages/trailor", {
              firstName: userFirstName,
              isUserLoggedIn: isUserLoggedIn,
              trailorData: result
            });
         }
       } else {
         console.log(err);
       }
     });




   
  }
  if (service === "buetician") {
     Buetician.find({}, (err, result) => {
       if (!err) {
         if (!result.length) {
           res.redirect("/service-not-found");
         } else {
    res.render("pages/buetician", {
      firstName: userFirstName,
      isUserLoggedIn: isUserLoggedIn,
      bueticianData: result
    });
         }
       } else {
         console.log(err);
       }
     });



  }
  if (service === "meat-delivery") {
     MeatDelivery.find({}, (err, result) => {
       if (!err) {
         if (!result.length) {
           res.redirect("/service-not-found");
         } else {
            res.render("pages/meat-delivery", {
              firstName: userFirstName,
              isUserLoggedIn: isUserLoggedIn,
              meatDeliveryData: result
            });
         }
       } else {
         console.log(err);
       }
     });
  
  }
  if (service === "tutor") {
     Tutor.find({}, (err, result) => {
       if (!err) {
         if (!result.length) {
           res.redirect("/service-not-found");
         } else {
           res.render("pages/tutor", {
             firstName: userFirstName,
             isUserLoggedIn: isUserLoggedIn,
             tutorData: result
           });
         }
       } else {
         console.log(err);
       }
     });

    
  }
  if (service === "tiffin-services") {
     TiffinService.find({}, (err, result) => {
       if (!err) {
         if (!result.length) {
           res.redirect("/service-not-found");
         } else {
               res.render("pages/tiffin-services", {
                 firstName: userFirstName,
                 isUserLoggedIn: isUserLoggedIn,
                 tiffinServiceData: result
               });
         }
       } else {
         console.log(err);
       }
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
