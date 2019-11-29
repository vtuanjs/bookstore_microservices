const mongoose = require("mongoose");

const connect = async () => {
  const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  let url = "";
  if (process.env.NODE_ENV === 'production') {
    url = process.env.MONGO_URL
  } else {
    url = process.env.MONGO_URL_TEST
  }
  await mongoose.connect(url, option);
  console.log("Customer database is connected");
};

module.exports = { connect };
