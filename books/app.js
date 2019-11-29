const express = require("express");
const app = express();
const book = require("./controller");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Success");
});

app.post("/books", book.createBook);

app.get("/books", book.getBooks);

app.get("/books/:bookId", book.getBook);

app.put("/books/:bookId", book.updateBook);

app.delete("/books/:bookId", book.deleteBook);

module.exports = app