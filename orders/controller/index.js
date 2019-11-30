const Order = require('../model')
const axios = require('axios')

module.exports.createOrder = async (req, res) => {
  const { customerId, bookId, initialDate, deliveryDate } = req.body;
  try {
    const newOrder = await Order.create({
      customerId,
      bookId,
      initialDate,
      deliveryDate
    });

    res.json({
      order: newOrder
    });
  } catch (error) {
    res.json({
      message: `Error: ${error}`
    });
  }
};

module.exports.getOrders = async (req, res) => {
  const { fields } = req.query;
  const selectFields = selectFieldsShow(fields);

  try {
    const orders = await Order.find().select(selectFields);

    res.json({
      orders
    });
  } catch (error) {
    res.status(404).json({
      message: `Get list orders error: ${error}`
    });
  }
};

const selectFieldsShow = fields => {
  if (fields) {
    return fields.split(",").join(" ");
  }

  return "";
};

module.exports.getOrder = async (req, res) => {
  const { orderId } = req.params;
  const { fields } = req.query;
  const selectFields = selectFieldsShow(fields);

  try {
    const order = await Order.findById(orderId).select(selectFields);

    const [resCustomer, resBook] = await Promise.all([
        axios.get(`http://localhost:4002/customers/${order.customerId}`),
        axios.get(`http://localhost:4001/books/${order.bookId}`)
    ])

    res.json({
      order: {
          ...order._doc,
          customerName: resCustomer.data.customer.name,
          bookTitle: resBook.data.book.title
      }
    });
  } catch (error) {
    res.status(404).json({
      message: `Get order error: ${error}`
    });
  }
};

module.exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { bookId, customerId, initialDate, deliveryDate } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        ...(bookId && { bookId }),
        ...(customerId && { customerId }),
        ...(initialDate && { initialDate }),
        ...(deliveryDate && { deliveryDate })
      },
      { new: true }
    );

    res.json({ order: updatedOrder });
  } catch (error) {
    res.json({ message: `Update order error: ${error}` });
  }
};

module.exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findOneAndRemove({ _id: orderId });

    res.json({
      message: "Delete order successfully!",
      order
    });
  } catch (error) {
    res.json({
      message: `Delete order error: ${error}`
    });
  }
};
