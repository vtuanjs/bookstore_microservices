const express = require('express');
const app = express();
const order = require('./controller')
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Success');
});

app.post('/orders', order.createOrder)

app.get("/orders", order.getOrders);

app.get("/orders/:orderId", order.getOrder);

app.put("/orders/:orderId", order.updateOrder);

app.delete("/orders/:orderId", order.deleteOrder);

module.exports = app;
