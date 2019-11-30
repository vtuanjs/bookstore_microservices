const app = require("./app")
const database = require("./database");

database.connect().then(() => {
  app.listen(4002, () => {
    console.log("Customer services running at port 4002...");
  });
});

