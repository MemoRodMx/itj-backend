const OrderModel = require("../models/Order.js");

const createOrder = async (order) => {
  order = new OrderModel(order);
  order.save();
  return order;
};

module.exports = {
  createOrder,
};
