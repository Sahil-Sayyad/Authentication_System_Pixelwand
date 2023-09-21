//import all required packages
require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const MongoStore = require("connect-mongo");

//for parsing the form data into urlencoded format
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

//handle session cookie
app.use(
  session({
    name: "Auth",
    secret: "asjfsdhd",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl:process.env.MONGO_URL,
        autoRemove: "disabled",
      },
      function (err) {
        console.log("Error in the mongo Store", err);
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//express routes handler
app.use("/", require("./routes"));
//start the server
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running server ${err}`);
  }
  console.log(`Server is running on ${port}`);
});