const app = require("./app")
const database = require("./database");

database.connect().then(() => {
  app.listen(4001, () => {
    console.log("Book services loading...");
  });
});

