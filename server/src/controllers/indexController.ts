import { Request, Response } from "express";

import pool from "../database";

class IndexController {
  public async index(req: Request, res: Response): Promise<any> {
    res.json('Index');
  }
}

export default new IndexController();
