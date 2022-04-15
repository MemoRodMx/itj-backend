import express from "express";
import ctrl from "../controllers/items-controller.js";

const router = express.Router();

router.get("/:id", ctrl.readItems);
router.get("/", ctrl.readItems);
router.post("/", ctrl.createItem);

export default router;
