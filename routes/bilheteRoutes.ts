import express from "express";
import { BilheteController } from "../controllers/BilheteController";

export const routerBilhete = express.Router();

routerBilhete.get("/boardingPass", BilheteController.boardingPass);
