const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const { connect, connection } = mongoose;
const { DB_URI } = process.env;

try {
  connect(DB_URI);
  connection.once("open", (_) => {
    console.log(`Connected to: ${DB_URI}`);
  });
} catch (err) {
  console.log(err);
}
