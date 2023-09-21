require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const db = require("./config/mongoose");
db();
//for parsing the form data into urlencoded format
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//express routes handler
app.use("/", require("./routes"));
//start the server
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running server ${err}`);
  }
  console.log(`Server is running on ${port}`);
});
