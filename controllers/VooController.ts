import { Request, Response } from "express";
import { retornarDados } from "../db/database";
import { formatarData } from "../helpers/voo";

export class VooController {
  static async buscaVoo(req: Request, res: Response) {
    try {
      const selectSql = `SELECT 
      trecho.ID_TRECHO,
      cidade_saida.nome_cidade AS cidade_partida, 
      cidade_chegada.nome_cidade AS cidade_chegada
  FROM trecho
  JOIN aeroporto aeroporto_saida ON trecho.ID_AEROPORTO_SAIDA = aeroporto_saida.ID_AEROPORTO
  JOIN cidade cidade_saida ON aeroporto_saida.ID_CIDADE = cidade_saida.ID_CIDADE
  JOIN aeroporto aeroporto_chegada ON trecho.ID_AEROPORTO_CHEGADA = aeroporto_chegada.ID_AEROPORTO
  JOIN cidade cidade_chegada ON aeroporto_chegada.ID_CIDADE = cidade_chegada.ID_CIDADE
  `;

      const result = (await retornarDados(
        selectSql,
        [],
        "Trecho"
      )) as string[][];

      let dados;

      if (result) {
        dados = result.map((item) => ({
          idTrecho: item[0],
          origem: item[1],
          destino: item[2],
        }));
      }

      res.render("voo/buscaVoo", { trecho: dados });
    } catch (error) {
      console.log(error);
    }
  }
  static async resultsVoos(req: Request, res: Response) {
    const idTrecho = req.params.id;
    const data = req.query.dataIda;

    try {
      const sql = `SELECT 
      v.ID_VOO,
      v.VALOR,
      v.HORARIO_SAIDA AS DATA_SAIDA,
      v.HORARIO_CHEGADA AS DATA_CHEGADA,
      c_saida.nome_cidade AS CIDADE_SAIDA,
      c_chegada.nome_cidade AS CIDADE_CHEGADA,
      v.iD_TRECHO,
      v.ID_AERONAVE 
  FROM 
      voo v
  JOIN 
      trecho t ON v.id_trecho = t.id_trecho
  JOIN 
      aeroporto a_saida ON t.id_aeroporto_saida = a_saida.id_aeroporto
  JOIN 
      aeroporto a_chegada ON t.id_aeroporto_chegada = a_chegada.id_aeroporto
  JOIN 
      cidade c_saida ON a_saida.id_cidade = c_saida.id_cidade
  JOIN 
      cidade c_chegada ON a_chegada.id_cidade = c_chegada.id_cidade
  WHERE 
      v.id_trecho = ${idTrecho}
      AND TRUNC(v.HORARIO_SAIDA) = TO_DATE('${data}', 'YYYY-MM-DD')
  `;

      let result = (await retornarDados(sql, [], "Voo")) as string[][];
      let dados;
      if (result) {
        dados = result.map((item) => ({
          idVoo: item[0],
          valor: parseFloat(item[1]).toFixed(2).replace(".", ","),
          horarioSaida: formatarData(item[2]), // Supondo que formatarData é uma função para formatar a data
          horarioChegada: formatarData(item[3]),
          origem: item[4],
          destino: item[5],
          idTrecho: item[6],
          idAeronave: item[7],
        }));
      }

      res.render("voo/searchFlies", { voos: dados });
    } catch (error) {
      console.log(error);
    }
  }
  static async escolhaValorPassagem(req: Request, res: Response) {
    const idVoo = req.params.id;
    try {
      const sql = `SELECT 
      v.ID_VOO,
      v.VALOR,
      v.HORARIO_SAIDA AS DATA_SAIDA,
      v.HORARIO_CHEGADA AS DATA_CHEGADA,
      c_saida.nome_cidade AS CIDADE_SAIDA,
      c_chegada.nome_cidade AS CIDADE_CHEGADA,
      v.iD_TRECHO,
      v.ID_AERONAVE 
  FROM 
      voo v
  JOIN 
      trecho t ON v.id_trecho = t.id_trecho
  JOIN 
      aeroporto a_saida ON t.id_aeroporto_saida = a_saida.id_aeroporto
  JOIN 
      aeroporto a_chegada ON t.id_aeroporto_chegada = a_chegada.id_aeroporto
  JOIN 
      cidade c_saida ON a_saida.id_cidade = c_saida.id_cidade
  JOIN 
      cidade c_chegada ON a_chegada.id_cidade = c_chegada.id_cidade
  WHERE 
      v.id_voo = ${idVoo}
  `;

      let result = (await retornarDados(sql, [], "Voo")) as string[][];
      let dados;
      if (result) {
        const categorias = {
          standard: 1.2,
          full: 1.3,
          premiumEconomy: 1.4,
        };

        dados = result.map((item) => ({
          idVoo: item[0],
          valor: parseFloat(item[1]).toFixed(2).replace(".", ","),
          valorStandard: (parseFloat(item[1]) * categorias.standard)
            .toFixed(2)
            .replace(".", ","),
          valorFull: (parseFloat(item[1]) * categorias.full)
            .toFixed(2)
            .replace(".", ","),
          valorPremiumEconomy: (parseFloat(item[1]) * categorias.premiumEconomy)
            .toFixed(2)
            .replace(".", ","),
          horarioSaida: formatarData(item[2]),
          horarioChegada: formatarData(item[3]),
          origem: item[4],
          destino: item[5],
          idTrecho: item[6],
          idAeronave: item[7],
        }));
      }

      res.render("voo/escolhaValorPassagem", { voos: dados });
    } catch (error) {
      console.log(error);
    }
  }

  static async escolhaPoltrona(req: Request, res: Response) {
    const idVoo = req.params.id;
    const sql = `select * from mapa_assento where id_voo = ${idVoo}`;
    const sql2 = `SELECT 
    v.ID_VOO,
    v.VALOR,
    v.HORARIO_SAIDA AS DATA_SAIDA,
    v.HORARIO_CHEGADA AS DATA_CHEGADA,
    c_saida.nome_cidade AS CIDADE_SAIDA,
    c_chegada.nome_cidade AS CIDADE_CHEGADA,
    v.iD_TRECHO,
    v.ID_AERONAVE 
FROM 
    voo v
JOIN 
    trecho t ON v.id_trecho = t.id_trecho
JOIN 
    aeroporto a_saida ON t.id_aeroporto_saida = a_saida.id_aeroporto
JOIN 
    aeroporto a_chegada ON t.id_aeroporto_chegada = a_chegada.id_aeroporto
JOIN 
    cidade c_saida ON a_saida.id_cidade = c_saida.id_cidade
JOIN 
    cidade c_chegada ON a_chegada.id_cidade = c_chegada.id_cidade
WHERE 
    v.id_voo = ${idVoo}`;
    try {
      let result = (await retornarDados(
        sql,
        [],
        "Mapa de assentos"
      )) as string[][];
      let dadosMapa;
      if (result) {
        dadosMapa = result.map((item) => ({
          idMapa: item[0],
          referencia: item[1],
          status: item[2],
          idVoo: item[3],
          idTicket: item[4],
        }));
      }
      let result2 = (await retornarDados(
        sql2,
        [],
        "Mapa de assentos"
      )) as string[][];
      let dadosVoo;
      if (result2) {
        dadosVoo = result2.map((item) => ({
          idVoo: item[0],
          valor: parseFloat(item[1]).toFixed(2).replace(".", ","),
          horarioSaida: formatarData(item[2]), // Supondo que formatarData é uma função para formatar a data
          horarioChegada: formatarData(item[3]),
          origem: item[4],
          destino: item[5],
          idTrecho: item[6],
          idAeronave: item[7],
        }));
      }
      res.render("voo/escolhaPoltrona", { mapa: dadosMapa, voo: dadosVoo });
    } catch (error) {
      console.log(error);
    }
  }
}
