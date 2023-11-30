import express from "express";

import { CompraController } from "../controllers/CompraController";

export const routerCompra = express.Router();

routerCompra.get("/purchase/:id", CompraController.purchase);
routerCompra.post("/purchase/:id", CompraController.purchaseSave);
