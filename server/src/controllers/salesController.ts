import { Request, Response } from "express";
import Model from "./modelController";

import pool from "../database";
import { promises } from "fs";

class SalesController {
  public index(req: Request, res: Response) {
    return res.json("listo");
  }

  public async cons(req: Request, res: Response) {
    const r = new Model();
    let data = {
      venta: {},
      detalles: []
    };
    const object = await pool.query(
      "SELECT v.dFecha,v.nIdEmpleado,e.cNombre as cNombreEmpleado,v.nIdCliente,c.cNombre as cNombreCliente,v.nSubTotal,v.nIva,v.nTotal FROM ventas v LEFT JOIN empleados e ON v.nIdEmpleado = e.nIdEmpleado LEFT JOIN clientes c ON v.nIdCliente = c.nIdCliente WHERE v.nIdVenta = ? AND v.bActivo = true",
      [req.params["id"]]
    );
    if (object.length > 0) {
      data.venta = object[0];
      data.detalles = await pool.query(
        "SELECT nIdProducto,nCantidad,nPrecio,nImporte FROM ventas_detalle WHERE nIdVenta = ? AND bActivo = true",
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
      "SELECT v.nIdVenta,v.dFecha,v.nIdEmpleado,e.cNombre as cNombreEmpleado,v.nIdCliente,c.cNombre as cNombreCliente,v.nSubTotal,v.nIva,v.nTotal FROM ventas v LEFT JOIN empleados e ON v.nIdEmpleado = e.nIdEmpleado LEFT JOIN clientes c ON v.nIdCliente = c.nIdCliente WHERE v.bActivo = true"
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
    const id = req.body["nIdVenta"];
    const object = await pool.query("UPDATE ventas SET ? WHERE nIdVenta = ?", [
      req.body['venta'],
      id
    ]);
    if (object.changedRows > 0) {
      await pool.query("DELETE FROM ventas_detalle WHERE nIdVenta = ?", [id]);
      for(let det of req.body['lstDetalles']){
        await pool.query("INSERT INTO ventas_detalle SET nIdVenta = ?, ?", [
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
    const object = await pool.query("INSERT INTO ventas SET ?", [req.body['venta']]);
    if (object.affectedRows > 0) {
      const idventa = await pool.query("SELECT MAX(nIdVenta) as id FROM ventas");
      for(let det of req.body['lstDetalles']){
        await pool.query("INSERT INTO ventas_detalle SET nIdVenta = ?, ?", [
          idventa[0].id,det
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
    const id = req.body["nIdVenta"];
    const object = await pool.query(
      "UPDATE ventas SET bActivo = false WHERE nIdVenta = ?",
      [id]
    );
    if (object.changedRows > 0) {
        await pool.query("UPDATE ventas_detalle SET bActivo = false WHERE nIdVenta = ?",[id]);
      r.message = "Eliminada con exito";
    } else {
      r.bError = true;
      r.message = "Error al eliminar";
    }
    return res.json(r);
  }
}

const structController = new SalesController();
export default structController;
