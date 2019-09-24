import { Request, Response } from "express";
import Model from "./modelController";

import pool from "../database";

class BranchOfficesController {
  public index(req: Request, res: Response) {
    return res.json("listo");
  }

  public async cons(req: Request, res: Response) {
    const r = new Model();
    const object = await pool.query(
      "SELECT nIdSucursal,cDescripcion FROM sucursales WHERE bActivo = true AND nIdSucursal = ?",
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
      "SELECT nIdSucursal,cDescripcion FROM sucursales WHERE bActivo = true"
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
    const id = req.body["nIdSucursal"];
    const object = await pool.query(
      "UPDATE sucursales SET ? WHERE nIdSucursal = ?",
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
    const object = await pool.query("INSERT INTO sucursales SET ?", [req.body]);
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
    const id = req.body["nIdSucursal"];
    const object = await pool.query(
      "UPDATE sucursales SET bActivo = false WHERE nIdSucursal = ?",
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

const branchOfficesController = new BranchOfficesController();
export default branchOfficesController;
