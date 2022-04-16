import service from "../services/orders-service.js";

const createOrder = async (req, res, next) => {
  try {
    let order = await service.createOrder(req.body);

    if (!order.errors) {
      res.status(201);
      res.json(order);
    } else {
      res.status(400);
      res.json({ message: _stringifyMongooseErrors(order.errors) });
    }
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

export default {
  createOrder,
};
