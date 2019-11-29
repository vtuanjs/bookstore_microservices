const express = require("express");
const app = express();
const database = require("./database");
const book = require("./controller");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Success");
});

app.get("/books", (req, res) => {
  res.send("Book");
});

app.post("/books", book.createBook);

database.connect().then(() => {
  app.listen(4001, () => {
    console.log("Book services loading...");
  });
});
