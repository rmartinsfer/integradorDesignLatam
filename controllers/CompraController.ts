import { Request, Response } from "express";
export class CompraController {
  static compra(req: Request, res: Response) {
    res.render("compra/purchase");
  }
}
