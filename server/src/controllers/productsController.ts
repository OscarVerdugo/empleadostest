import { Request, Response } from "express";
import Model from "./modelController";

import pool from "../database";
import { promises } from "fs";

class ProductsController {
  public index(req: Request, res: Response) {
    return res.json("listo");
  }

  public async cons(req: Request, res: Response) {
    const r = new Model();
    const object = await pool.query(
      "SELECT p.nIdProducto,p.cDescripcion,p.nPrecio,p.cUnidad,p.nIdProveedor,pv.cNombre as cDescripcionProveedor FROM productos p LEFT JOIN proveedores pv ON p.nIdProveedor = pv.nIdProveedor WHERE p.nIdProducto = ? AND p.bActivo = true",
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
      "SELECT p.nIdProducto,p.cDescripcion,p.nPrecio,p.cUnidad,p.nIdProveedor,pv.cNombre as cDescripcionProveedor FROM productos p LEFT JOIN proveedores pv ON p.nIdProveedor = pv.nIdProveedor WHERE p.bActivo = true"
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
    const id = req.body["nIdProducto"];
    const object = await pool.query(
      "UPDATE productos SET ? WHERE nIdProducto = ?",
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
    const object = await pool.query("INSERT INTO productos SET ?", req.body);
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
    const id = req.body["nIdProducto"];
    const object = await pool.query(
      "UPDATE productos SET bActivo = false WHERE nIdProducto = ?",
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

const productsController = new ProductsController();
export default productsController;
