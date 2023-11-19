import { Request, Response } from "express";

export class VooController{
    static buscaVoo(req: Request, res: Response){
        res.render("home");
    };
    static resultsVoos(req: Request, res: Response){
        res.render("page/searchFlies");
    };
}
