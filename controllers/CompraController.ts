import e, { Request, Response } from "express";
import { executarSql, retornarDados } from "../db/database";
export class CompraController {
  static purchase(req: Request, res: Response) {
    const idVoo = req.params.id; // Aqui você obterá o número após /purchase/
    console.log(idVoo); // Isso mostrará o número na console do servidor
    res.render("compra/purchase", { idVoo: idVoo });
  }
  static async purchaseSave(req: Request, res: Response) {
    const nome = req.body.nome;
    const email = req.body.email;
    const cpf = req.body.cpf;
    const telefone = req.body.telefone;
    const tipoPagamento = req.body.pagamento;
    const idVoo = req.params.id;
    console.log(nome, email, cpf, telefone, tipoPagamento, idVoo);

    let poltronas = req.query.assentosSelecionados || [];

    res.render("bilhete/boardingPass");
  }
}
