import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();
const { PORT } = process.env;
const port = PORT ?? 2000;
const router = express.Router();

import itemsRouter from "./src/routes/items.routes.js";
import ordersRouter from "./src/routes/orders.routes.js";

import "./src/models/connection.js";

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
