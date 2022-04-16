const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

dotenv.config();
const app = express();
const { PORT } = process.env;
const port = PORT ?? 2000;
const router = express.Router();

const itemsRouter = require("./routes/items.routes.js");
const ordersRouter = require("./routes/orders.routes.js");

require("./models/connection.js");

app.listen(port, () => {
  console.log(`Ready on ${port}!`);
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ message: error.message });
});

app.use(cors());

// Enable json body
app.use(express.json());

// Routes
app.use("/items", itemsRouter);
app.use("/orders", ordersRouter);

// Default
router.get("", (req, res) => {
  res.json({ message: "Online" });
});

app.use("/", router);

module.exports = app;
