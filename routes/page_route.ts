import express from "express";
import {VooController} from "../controllers/VooController";

export const router = express.Router();

router.get("/buscaVoo", VooController.buscaVoo);
router.get("/resultsVoos", VooController.resultsVoos);
router.get("/escolhaValorPassagem", VooController.escolhaValorPassagem);
router.get("/escolhaPoltrona", VooController.escolhaPoltrona);