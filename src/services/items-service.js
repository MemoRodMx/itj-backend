const ItemModel = require("../models/Item.js");

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

const updateItem = async (_id, item) => {
  return await ItemModel.findByIdAndUpdate(_id, item, {
    returnDocument: "after",
  });
};

const removeItem = async (_id) => {
  return await ItemModel.findOneAndDelete(_id);
};

module.exports = {
  readItems,
  createItem,
  updateItem,
  removeItem,
};
