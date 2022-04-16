import express from "express";
import ctrl from "../controllers/orders-controller.js";

const router = express.Router();

router.post("/", ctrl.createOrder);

export default router;
