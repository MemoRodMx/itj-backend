const express = require("express");
const ctrl = require("../controllers/orders-controller.js");

const router = express.Router();

router.post("/", ctrl.createOrder);

module.exports = router;
