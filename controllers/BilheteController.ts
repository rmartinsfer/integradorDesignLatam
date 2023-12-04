import { Request, Response } from "express";
import { retornarDados } from "../db/database";
import { dataSeparada, formatarData } from "../helpers/voo";
import { transport } from "../helpers/emails";

import * as dotenv from "dotenv";

dotenv.config();

export class BilheteController {
  static async boardingPass(req: Request, res: Response) {
    const idVenda = req.params.id;
    try {
      const sqlDados = `select t.nome,(SELECT 
        a.nome_aeroporto
    FROM 
        aeroporto a,
        ticket t,
        voo v,
        trecho c
    WHERE 
        t.id_venda = ${idVenda}
        AND t.id_voo = v.id_voo
        AND v.id_trecho = c.id_trecho
        AND c.id_aeroporto_saida = a.id_aeroporto),(SELECT 
        a.nome_aeroporto
    FROM 
        aeroporto a,
        ticket t,
        voo v,
        trecho c
    WHERE 
        t.id_venda = 162
        AND t.id_voo = v.id_voo
        AND v.id_trecho = c.id_trecho
        AND c.id_aeroporto_chegada = a.id_aeroporto),(select horario_saida from voo v, ticket t where t.id_venda=${idVenda} and v.id_voo=t.id_voo), t.id_voo , m.referencia,t.email from ticket t,mapa_assento m where t.id_venda=${idVenda} and t.id_ticket=m.id_ticket`;

      const result = (await retornarDados(
        sqlDados,
        [],
        "Dados gerais"
      )) as string[][];

      var dados;

      if (result) {
        dados = result.map((item) => {
          const dataFormatada = dataSeparada(item[3]);
          return {
            nome: item[0],
            origem: item[1],
            destino: item[2],
            dataSaida: dataFormatada.data,
            horaSaida: dataFormatada.hora,
            idVoo: item[4],
            referencia: item[5],
            email: item[6],
          };
        });
      }
      /////código para enviar email

      if (dados) {
        dados.forEach(async (item) => {
          const mailOptions = {
            from: `Urubu Airlines <${process.env.USER_MAIL}>`,
            to: item.email,
            subject: "Obrigado por escolher a Urubu Airlines",
            html: `<h2>Detalhes do seu Voo</h2>
            <div>
              <strong>ID do Voo:</strong> <span>${item.idVoo}</span>
            </div>
            <div>
              <strong>Partida:</strong> <span>${item.origem}</span>
            </div>
            <div>
              <strong>Destino:</strong> <span>${item.destino}</span>
            </div>
            <div>
              <strong>Data de Saída:</strong> <span>${item.dataSaida}</span>
            </div>
            <div>
              <strong>Horário de Saída:</strong> <span>${item.horaSaida}</span>
            </div>`,
          };
          if (await transport.sendMail(mailOptions)) {
            console.log("Email enviado com sucesso!");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }

    res.render("bilhete/boardingPass", { dados: dados });
  }
}
