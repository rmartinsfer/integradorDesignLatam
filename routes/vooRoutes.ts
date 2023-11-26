import express from "express";
import { VooController } from "../controllers/VooController";

export const routerVoo = express.Router();

routerVoo.get("/buscaVoo", VooController.buscaVoo);
// routerVoo.get("/resultsVoos", VooController.resultsVoos);
routerVoo.get("/resultsVoos/:id", VooController.resultsVoos);
routerVoo.get("/escolhaValorPassagem/:id", VooController.escolhaValorPassagem);
routerVoo.get("/escolhaPoltrona/:id", VooController.escolhaPoltrona);
