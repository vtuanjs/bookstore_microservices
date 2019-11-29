const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const customer = require('./controller')
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Success');
});

app.post('/customers', customer.createCustomer);

app.get("/customers", customer.getCustomers);

app.get("/customers/:customerId", customer.getCustomer);

app.put("/customers/:customerId", customer.updateCustomer);

app.delete("/customers/:customerId", customer.deleteCustomer);

module.exports = app;
