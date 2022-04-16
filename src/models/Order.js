const { Schema, model } = require("mongoose");
const Item = require("./Item.js");

const ItemSchema = Item.schema;

const Order = Schema(
  {
    name: {
      type: String,
      required: "Your name is required",
    },
    address: {
      type: String,
      required: "Your address is required",
    },
    items: [ItemSchema],
  },
  { timestamps: true }
);

module.exports = model("OrderModel", Order, "orders");
