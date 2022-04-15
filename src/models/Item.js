import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Item = Schema(
  {
    name: {
      type: String,
      required: "The item name is required",
    },
    description: String,
    image_url: String,
    price: {
      type: Number,
      required: "The item price is required",
    },
  },
  { timestamps: true }
);

export default model("ItemModel", Item, "items");
