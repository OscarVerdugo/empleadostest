import { Request, Response } from "express";
import Model from "./modelController";

import pool from "../database";
import { promises } from "fs";

class PurchasesController {
  public index(req: Request, res: Response) {
    return res.json("listo");
  }

  public async cons(req: Request, res: Response) {
    const r = new Model();
    let data = {
      compra: {},
      detalles: []
    };
    const object = await pool.query(
      "SELECT v.dFecha,v.nIdEmpleado,e.cNombre as cNombreEmpleado,v.nIdProveedor,p.cNombre as cNombreProveedor,v.nSubTotal,v.nIva,v.nTotal FROM compras v LEFT JOIN empleados e ON v.nIdEmpleado = e.nIdEmpleado LEFT JOIN proveedores p ON v.nIdProveedor = p.nIdProveedor WHERE v.nIdCompra = ? AND v.bActivo = true",
      [req.params["id"]]
    );
    if (object.length > 0) {
      data.compra = object[0];
      data.detalles = await pool.query(
        "SELECT nIdProducto,nCantidad,nPrecio,nImporte FROM compras_detalle WHERE nIdCompra = ? AND bActivo = true",
        [req.params["id"]]
      );
      r.data = data;
      r.message = "Exito";
    } else {
      r.bError = true;
      r.message = "Ninguna encontrada";
    }
    return res.json(r);
  }

  public async select(req: Request, res: Response) {
    const r = new Model();
    const object = await pool.query(
      "SELECT v.nIdCompra,v.dFecha,v.nIdEmpleado,e.cNombre as cNombreEmpleado,v.nIdProveedor,p.cNombre as cNombreProveedor,v.nSubTotal,v.nIva,v.nTotal FROM compras v LEFT JOIN empleados e ON v.nIdEmpleado = e.nIdEmpleado LEFT JOIN proveedores p ON v.nIdProveedor = p.nIdProveedor WHERE v.bActivo = true"
    );
    if (object.length > 0) {
      r.data = object;
      r.message = "Exito";
    } else {
      r.bError = true;
      r.message = "Ninguna encontrada";
    }
    return res.json(r);
  }

  public async update(req: Request, res: Response) {
    const r = new Model();
    const id = req.body["nIdCompra"];
    const object = await pool.query("UPDATE compras SET ? WHERE nIdCompra = ?", [
      req.body['compra'],
      id
    ]);
    if (object.changedRows > 0) {
      await pool.query("DELETE FROM compras_detalle WHERE nIdCompra = ?", [id]);
      for(let det of req.body['lstDetalles']){
        await pool.query("INSERT INTO compras_detalle SET nIdCompra = ?, ?", [
          id,det
        ]);
      }
      r.message = "Actualizada con exito";
    } else {
      r.bError = true;
      r.message = "Error al insertar";
    }
    return res.json(r);
  }

  public async insert(req: Request, res: Response) {
    const r = new Model();
    const object = await pool.query("INSERT INTO compras SET ?", [req.body['compra']]);
    if (object.affectedRows > 0) {
      const idcompra = await pool.query("SELECT MAX(nIdCompra) as id FROM compras");
      for(let det of req.body['lstDetalles']){
        await pool.query("INSERT INTO compras_detalle SET nIdCompra = ?, ?", [
          idcompra[0].id,det
        ]);
      }
      r.message = "Agregada con exito";
    } else {
      r.bError = true;
      r.message = "Erro al agregar";
    }
    return res.json(r);
  }

  public async delete(req: Request, res: Response) {
    const r = new Model();
    const id = req.body["nIdCompra"];
    const object = await pool.query(
      "UPDATE compras SET bActivo = false WHERE nIdCompra = ?",
      [id]
    );
    if (object.changedRows > 0) {
        await pool.query("UPDATE compras_detalle SET bActivo = false WHERE nIdCompra = ?",[id]);
      r.message = "Eliminada con exito";
    } else {
      r.bError = true;
      r.message = "Error al eliminar";
    }
    return res.json(r);
  }
}

const structController = new PurchasesController();
export default structController;
