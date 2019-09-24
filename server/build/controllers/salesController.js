"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modelController_1 = __importDefault(require("./modelController"));
const database_1 = __importDefault(require("../database"));
class SalesController {
    index(req, res) {
        return res.json("listo");
    }
    cons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            let data = {
                venta: {},
                detalles: []
            };
            const object = yield database_1.default.query("SELECT v.dFecha,v.nIdEmpleado,e.cNombre as cNombreEmpleado,v.nIdCliente,c.cNombre as cNombreCliente,v.nSubTotal,v.nIva,v.nTotal FROM ventas v LEFT JOIN empleados e ON v.nIdEmpleado = e.nIdEmpleado LEFT JOIN clientes c ON v.nIdCliente = c.nIdCliente WHERE v.nIdVenta = ? AND v.bActivo = true", [req.params["id"]]);
            if (object.length > 0) {
                data.venta = object[0];
                data.detalles = yield database_1.default.query("SELECT nIdProducto,nCantidad,nPrecio,nImporte FROM ventas_detalle WHERE nIdVenta = ? AND bActivo = true", [req.params["id"]]);
                r.data = data;
                r.message = "Exito";
            }
            else {
                r.bError = true;
                r.message = "Ninguna encontrada";
            }
            return res.json(r);
        });
    }
    select(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            const object = yield database_1.default.query("SELECT v.nIdVenta,v.dFecha,v.nIdEmpleado,e.cNombre as cNombreEmpleado,v.nIdCliente,c.cNombre as cNombreCliente,v.nSubTotal,v.nIva,v.nTotal FROM ventas v LEFT JOIN empleados e ON v.nIdEmpleado = e.nIdEmpleado LEFT JOIN clientes c ON v.nIdCliente = c.nIdCliente WHERE v.bActivo = true");
            if (object.length > 0) {
                r.data = object;
                r.message = "Exito";
            }
            else {
                r.bError = true;
                r.message = "Ninguna encontrada";
            }
            return res.json(r);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            const id = req.body["nIdVenta"];
            const object = yield database_1.default.query("UPDATE ventas SET ? WHERE nIdVenta = ?", [
                req.body['venta'],
                id
            ]);
            if (object.changedRows > 0) {
                yield database_1.default.query("DELETE FROM ventas_detalle WHERE nIdVenta = ?", [id]);
                for (let det of req.body['lstDetalles']) {
                    yield database_1.default.query("INSERT INTO ventas_detalle SET nIdVenta = ?, ?", [
                        id, det
                    ]);
                }
                r.message = "Actualizada con exito";
            }
            else {
                r.bError = true;
                r.message = "Error al insertar";
            }
            return res.json(r);
        });
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            const object = yield database_1.default.query("INSERT INTO ventas SET ?", [req.body['venta']]);
            if (object.affectedRows > 0) {
                const idventa = yield database_1.default.query("SELECT MAX(nIdVenta) as id FROM ventas");
                for (let det of req.body['lstDetalles']) {
                    yield database_1.default.query("INSERT INTO ventas_detalle SET nIdVenta = ?, ?", [
                        idventa[0].id, det
                    ]);
                }
                r.message = "Agregada con exito";
            }
            else {
                r.bError = true;
                r.message = "Erro al agregar";
            }
            return res.json(r);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            const id = req.body["nIdVenta"];
            const object = yield database_1.default.query("UPDATE ventas SET bActivo = false WHERE nIdVenta = ?", [id]);
            if (object.changedRows > 0) {
                yield database_1.default.query("UPDATE ventas_detalle SET bActivo = false WHERE nIdVenta = ?", [id]);
                r.message = "Eliminada con exito";
            }
            else {
                r.bError = true;
                r.message = "Error al eliminar";
            }
            return res.json(r);
        });
    }
}
const structController = new SalesController();
exports.default = structController;
