import { Request, Response } from "express";
export class CompraController {
  static purchase(req: Request, res: Response) {
    const idVoo = req.body.id;

    let poltronas = req.query.assentosSelecionados || [];

    // Verifica se o primeiro elemento do array não está vazio e é uma string
    if (
      Array.isArray(poltronas) &&
      poltronas.length > 0 &&
      typeof poltronas[0] === "string"
    ) {
      const assentos = poltronas[0].match(/\d+/g); // Extrai os números usando expressão regular
    }
    res.render("compra/purchase");
  }
  static async purchaseSave(req: Request, res: Response) {}
}
