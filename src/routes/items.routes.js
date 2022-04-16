const express = require("express");
const ctrl = require("../controllers/items-controller.js");

const router = express.Router();

router.get("/:id", ctrl.readItems);
router.get("/", ctrl.readItems);
router.post("/", ctrl.createItem);
router.put("/", ctrl.updateItem);
router.delete("/:id", ctrl.removeItem);

module.exports = router;
