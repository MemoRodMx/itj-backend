import OrderModel from "../models/Order.js";

const createOrder = async (order) => {
  order = new OrderModel(order);
  order.save();
  return order;
};

export default {
  createOrder,
};
