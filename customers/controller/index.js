const Customer = require("../model");

module.exports.createCustomer = async (req, res) => {
  const { name, age, address } = req.body;
  try {
    const newCustomer = await Customer.create({
      name,
      age,
      address
    });

    res.json({
      customer: newCustomer
    });
  } catch (error) {
    res.json({
      message: `Error: ${error}`
    });
  }
};
module.exports.getCustomers = async (req, res) => {
  const { fields } = req.query;
  const selectFields = selectFieldsShow(fields);

  try {
    const customers = await Customer.find().select(selectFields);

    res.json({
      customers
    });
  } catch (error) {
    res.status(404).json({
      message: `Get list customers error: ${error}`
    });
  }
};

const selectFieldsShow = fields => {
  if (fields) {
    return fields.split(",").join(" ");
  }

  return "";
};

module.exports.getCustomer = async (req, res) => {
  const { customerId } = req.params;
  const { fields } = req.query;
  const selectFields = selectFieldsShow(fields);

  try {
    const customer = await Customer.findById(customerId).select(selectFields);

    res.json({
      customer
    });
  } catch (error) {
    res.status(404).json({
      message: `Get customer error: ${error}`
    });
  }
};

module.exports.updateCustomer = async (req, res) => {
  const { customerId } = req.params;
  const { name, age, address } = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      {
        ...(name && { name }),
        ...(age && { age }),
        ...(address && { address })
      },
      { new: true }
    );

    res.json({ customer: updatedCustomer });
  } catch (error) {
    res.json({ message: `Update customer error: ${error}` });
  }
};

module.exports.deleteCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findOneAndRemove({ _id: customerId });

    res.json({
      message: "Delete customer successfully!",
      customer
    });
  } catch (error) {
    res.json({
      message: `Delete customer error: ${error}`
    });
  }
};
