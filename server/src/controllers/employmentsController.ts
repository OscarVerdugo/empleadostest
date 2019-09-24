import { Request, Response } from "express";
import Model from "./modelController";

import pool from "../database";

class EmploymentsController {
  public index(req: Request, res: Response) {
    return res.json("listo");
  }

  public async cons(req: Request, res: Response) {
    const r = new Model();
    const object = await pool.query(
      "SELECT nIdPuesto,cDescripcion FROM puestos WHERE bActivo = true AND nIdPuesto = ?",
      [req.params["id"]]
    );
    if (object.length > 0) {
      r.data = object[0];
      r.message = "Exito";
    } else {
      r.bError = true;
      r.message = "Ninguno encontrado";
    }
    return res.json(r);
  }

  public async select(req: Request, res: Response) {
    const r = new Model();
    const object = await pool.query(
      "SELECT nIdPuesto,cDescripcion FROM puestos WHERE bActivo = true"
    );
    if (object.length > 0) {
      r.data = object;
      r.message = "Exito";
    } else {
      r.bError = true;
      r.message = "Ninguno encontrado";
    }
    return res.json(r);
  }

  public async update(req: Request, res: Response) {
    const r = new Model();
    const id = req.body["nIdPuesto"];
    const object = await pool.query(
      "UPDATE puestos SET ? WHERE nIdPuesto = ?",
      [req.body, id]
    );
    if (object.changedRows > 0) {
      r.message = "Actualizado con exito";
    } else {
      r.bError = true;
      r.message = "Error al insertar";
    }
    return res.json(r);
  }

  public async insert(req: Request, res: Response) {
    const r = new Model();
    const object = await pool.query("INSERT INTO puestos SET ?", [req.body]);
    if (object.affectedRows > 0) {
      r.message = "Agregado con exito";
    } else {
      r.bError = true;
      r.message = "Erro al agregar";
    }
    return res.json(r);
  }

  public async delete(req: Request, res: Response) {
    const r = new Model();
    const id = req.body["nIdPuesto"];
    const object = await pool.query(
      "UPDATE puestos SET bActivo = false WHERE nIdPuesto = ?",
      [id]
    );
    if (object.changedRows > 0) {
      r.message = "Eliminado con exito";
    } else {
      r.bError = true;
      r.message = "Error al eliminar";
    }
    return res.json(r);
  }
}

const employmentsController = new EmploymentsController();
export default employmentsController;
