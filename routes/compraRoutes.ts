import express from "express";

import { CompraController } from "../controllers/CompraController";

export const routerCompra = express.Router();

routerCompra.get("/purchase", CompraController.purchase);
routerCompra.post("/purchase", CompraController.purchaseSave);
