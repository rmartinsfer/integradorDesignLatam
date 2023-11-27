import { Request, Response } from "express";
export class CompraController {
  static purchase(req: Request, res: Response) {
    res.render("compra/purchase");
  }
  static async purchaseSave(req: Request, res: Response) {}
}
