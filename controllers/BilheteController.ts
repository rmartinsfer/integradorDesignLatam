import { Request, Response } from "express";

export class BilheteController {
  static async boardingPass(req: Request, res: Response) {
    res.render("bilhete/boardingPass");
  }
}
