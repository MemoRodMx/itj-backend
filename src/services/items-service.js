import ItemModel from "../models/Item.js";

const readItems = async ({ id }) => {
  let filter = {};

  if (id) {
    filter = {
      _id: id,
    };
    return await ItemModel.findOne(filter);
  }
  return await ItemModel.find(filter);
};

const createItem = async (item) => {
  item = new ItemModel(item);
  item.save();
  return item;
};

const updateItem = async () => {};

const removeItem = async () => {};

export default {
  readItems,
  createItem,
  updateItem,
  removeItem,
};
