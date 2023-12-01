import { Request, Response } from "express";
import { retornarDados } from "../db/database";
import { formatarData } from "../helpers/voo";

export class BilheteController {
  static async boardingPass(req: Request, res: Response) {
    const idVenda = req.params.id;
    try {
      const sqlDados = `SELECT T.NOME, V.HORARIO_SAIDA, V.HORARIO_CHEGADA, T.ID_VOO, M.REFERENCIA 
        FROM TICKET T, VOO V, MAPA_ASSENTO M
        WHERE T.ID_VENDA=${idVenda} AND V.ID_VOO=T.ID_VOO AND M.ID_VOO=T.ID_VOO  AND M.ID_TICKET=T.ID_TICKET`;

      const result = (await retornarDados(
        sqlDados,
        [],
        "Dados gerais"
      )) as string[][];

      var dados;

      if (result) {
        dados = result.map((item) => ({
          nome: item[0],
          horarioSaida: formatarData(item[1]),
          horarioChegada: formatarData(item[2]),
          idVoo: item[3],
          referencia: item[4],
        }));
      }
    } catch (error) {
      console.log(error);
    }
    res.render("bilhete/boardingPass", { dados: dados });
  }
}
