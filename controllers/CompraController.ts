import { Request, Response } from "express";
import { executarSql, retornarDados } from "../db/database";
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
  static async purchaseSave(req: Request, res: Response) {
    let objeto = "Venda";
    const idVoo = req.params.id;
    const nome = req.body.nome;
    const email = req.body.email;
    const cpf = req.body.cpf;
    const telefone = req.body.telefone;
    const tipoPagamento = req.body.pagamento;

    const sql = `INSERT INTO VENDA
                (ID_VENDA, DATA_VENDA, TIPO_PAGAMENTO) 
                VALUES (SEQ_VENDA.NEXTVAL, TO_DATE(SYSDATE), :1)`;

    const selectSql = `SELECT ID_VENDA FROM VENDA ORDER BY ID_VENDA DESC FETCH FIRST 1 ROW ONLY`;

    const dados = [tipoPagamento];
    let dadosVenda;

    try {
      executarSql(sql, dados, objeto);

      const result = (await retornarDados(
        selectSql,
        [],
        "Venda"
      )) as string[][];

      if (result) {
        dadosVenda = result.map((item) => ({
          idVenda: item[0],
        }));
      }
      if (dadosVenda) {
        console.log(dadosVenda[0].idVenda);
      }
    } catch (error) {
      console.log(error);
    }

    res.render("bilhete/boardingPass");
  }
}
