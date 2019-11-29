const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const OrderSchema = new Schema({
  customerId: {
    type: ObjectId,
    required: true
  },
  bookId: {
    type: ObjectId,
    required: true
  },
  initialDate: {
    type: Date,
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  }
});

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order