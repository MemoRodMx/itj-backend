const service = require("../services/items-service.js");

const readItems = async (req, res, next) => {
  try {
    res.json(await service.readItems(req.params));
  } catch (err) {
    next(err);
  }
};

const createItem = async (req, res, next) => {
  try {
    let item = await service.createItem(req.body);

    if (!item.errors) {
      res.status(201);
      res.json(item);
    } else {
      res.status(400);
      res.json({ message: _stringifyMongooseErrors(item.errors) });
    }
  } catch (err) {
    next(err);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { _id } = req.body;
    delete req.body._id;
    let item = await service.updateItem(_id, req.body);

    if (!item.errors) {
      res.status(200);
      res.json(item);
    } else {
      res.status(400);
      res.json({ message: _stringifyMongooseErrors(item.errors) });
    }
  } catch (err) {
    next(err);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    let deleted = await service.removeItem(id);

    res.status(200);
    res.json({ _id: id });
  } catch (err) {
    next(err);
  }
};

const _stringifyMongooseErrors = (errors) => {
  let keys = Object.keys(errors);
  let errorMessages = [];

  keys.forEach((error, i) => {
    if (undefined != errors[error].kind) {
      if (error.lastIndexOf(".") != -1) {
        let index = error.split(".");

        if (index[1] == 0) {
          index[1]++;
          errorMessages.push({
            field: `${_ucWord(index[0])} / ${index[1]}`,
            error: errors[error].message,
          });
        } else {
          let fieldErrorLabel = `${_ucWord(index[0])} / ${_ucWord(index[1])}`;

          if (undefined != index[2]) {
            if (!isNaN(index[2])) {
              fieldErrorLabel += ` / item #${parseInt(index[2]) + 1}`;
            } else {
              fieldErrorLabel += ` / ${index[2]}`;
            }
          }

          if (undefined != index[3]) {
            fieldErrorLabel += ` / ${index[3]}`;
          }

          if (undefined != index[4]) {
            if (!isNaN(index[4])) {
              fieldErrorLabel += ` / item #${parseInt(index[4]) + 1} / ${
                index[5]
              }`;
            } else {
              fieldErrorLabel += ` / ${index[4]}`;
            }
          }

          if (undefined != index[6]) {
            fieldErrorLabel += ` / ${index[6]}`;
          }

          errorMessages.push({
            field: fieldErrorLabel,
            error: errors[error].message,
          });
        }
      } else {
        errorMessages.push({
          field: _ucWord(error),
          error: errors[error].message,
        });
      }
    } else {
      console.log("Error excluido", errors[error]);
    }
  });

  return errorMessages;
};

const _ucWord = (word, removeUnderscores = true) => {
  word = word.charAt(0).toUpperCase() + word.substring(1, word.length);

  return removeUnderscores ? _removeAllUnderscores(word) : word;
};

const _removeAllUnderscores = (word) => {
  while (word.lastIndexOf("_") != -1) {
    word = word.replace("_", " ");
  }

  return word;
};

module.exports = {
  readItems,
  createItem,
  updateItem,
  removeItem,
};
