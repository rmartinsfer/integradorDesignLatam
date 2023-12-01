import e, { Request, Response } from "express";
import { executarSql, retornarDados } from "../db/database";
import { error } from "console";
import { DATE } from "oracledb";
import { cp } from "fs";
import { type } from "os";
export class CompraController {
  static purchase(req: Request, res: Response) {
    const idVoo = req.params.id;
    const assentosSelecionados = req.query.assentosSelecionados;

    res.render("compra/purchase", {
      idVoo: idVoo,
      assentosSelecionados: assentosSelecionados,
    });
  }
  static async purchaseSave(req: Request, res: Response) {
    const nome = req.body.nome;
    const email = req.body.email;
    const cpf = req.body.cpf;
    const telefone = req.body.telefone;
    const tipoPagamento = req.body.pagamento;
    const idVoo = req.params.id;
    const dataVenda = new Date();
    let assentosStrings = req.body.assentos;
    let numeros: number[] = [];

    let numerosStrings = assentosStrings.match(/\d+/g);

    if (numerosStrings) {
      numeros = numerosStrings.map((numStr: any) => parseInt(numStr));
    }
    try {
      //salvando a venda
      const sqlVenda = `INSERT INTO VENDA 
       (ID_VENDA, DATA_VENDA, TIPO_PAGAMENTO)
       VALUES
       (SEQ_VENDA.NEXTVAL, :1, :2)`;

      const dadosVenda = [dataVenda, tipoPagamento];

      if (await executarSql(sqlVenda, dadosVenda, "tabela venda")) {
        //recuperando o último id salvo da tabela venda
        const selectSql = `SELECT MAX(ID_VENDA) FROM VENDA`;
        const resultVenda: any = await retornarDados(
          selectSql,
          [],
          "ID da Venda"
        );

        if (resultVenda && resultVenda.length > 0) {
          var idVenda = resultVenda[0][0];
          //salvar o ticket
          const sqlTicket = `INSERT INTO TICKET(ID_TICKET,ID_VENDA,ID_VOO,NOME,EMAIL,TELEFONE,CPF)
          VALUES (SEQ_TICKET.NEXTVAL,:1,:2,:3,:4,:5,:6)`;

          const dadosTicket = [idVenda, idVoo, nome, email, telefone, cpf];

          if (await executarSql(sqlTicket, dadosTicket, "tabela ticket")) {
            //pegando id do último mapa de assento
            const selectSql = `SELECT MAX(ID_TICKET) FROM TICKET`;
            const resultTicket: any = await retornarDados(
              selectSql,
              [],
              "ID do assento"
            );
            if (resultTicket && resultTicket.length > 0) {
              const idTicket = resultTicket[0][0];
              //sql mapa de assentos
              for (let i = 0; i < numeros.length; i++) {
                const sqlMapa = `UPDATE MAPA_ASSENTO SET STATUS = 'ocupado', ID_TICKET = '${idTicket}' WHERE ID_MAPA_ASSENTO = '${numeros[i]}' `;
                executarSql(sqlMapa, [], "Mapa de assentos");
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    res.redirect(`/boardingPass/${idVenda}`);
  }
}
