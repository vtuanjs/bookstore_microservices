const app = require("./app")
const database = require("./database");

database.connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Customer services running at port 4002...");
  });
});

