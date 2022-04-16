import mongoose from "mongoose";
const { Schema, model } = mongoose;
import Item from "./Item.js";

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

export default model("OrderModel", Order, "orders");
