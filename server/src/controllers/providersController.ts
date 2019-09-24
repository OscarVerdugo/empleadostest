import { Request, Response } from "express";
import Model from "./modelController";

import pool from "../database";
import { promises } from "fs";

class ProvidersController {
  public index(req: Request, res: Response) {
    return res.json("listo");
  }

  public async cons(req: Request, res: Response) {
    const r = new Model();
    const object = await pool.query(
      "SELECT nIdProveedor,cNombre,cNumTel,cEncargado,cNumEncargado,cNumEncargado,cCorreo FROM proveedores WHERE nIdProveedor = ? AND bActivo = true",
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
      "SELECT nIdProveedor,cNombre,cNumTel,cEncargado,cNumEncargado,cNumEncargado,cCorreo FROM proveedores WHERE bActivo = true"
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
    const id = req.body["nIdProveedor"];
    const object = await pool.query(
      "UPDATE proveedores SET ? WHERE nIdProveedor = ?",
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
    const object = await pool.query("INSERT INTO proveedores SET ?", req.body);
    if (object.affectedRows > 0) {
      r.message = "Agregado con exito";
    } else {
      r.bError = true;
      r.message = "Error al agregar";
    }
    return res.json(r);
  }

  public async delete(req: Request, res: Response) {
    const r = new Model();
    const id = req.body["nIdProveedor"];
    const object = await pool.query(
      "UPDATE proveedores SET bActivo = false WHERE nIdProveedor = ?",
      id
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

const providersController = new ProvidersController();
export default providersController;
