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
class PurchasesController {
    index(req, res) {
        return res.json("listo");
    }
    cons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            let data = {
                compra: {},
                detalles: []
            };
            const object = yield database_1.default.query("SELECT v.dFecha,v.nIdEmpleado,e.cNombre as cNombreEmpleado,v.nIdProveedor,p.cNombre as cNombreProveedor,v.nSubTotal,v.nIva,v.nTotal FROM compras v LEFT JOIN empleados e ON v.nIdEmpleado = e.nIdEmpleado LEFT JOIN proveedores p ON v.nIdProveedor = p.nIdProveedor WHERE v.nIdCompra = ? AND v.bActivo = true", [req.params["id"]]);
            if (object.length > 0) {
                data.compra = object[0];
                data.detalles = yield database_1.default.query("SELECT nIdProducto,nCantidad,nPrecio,nImporte FROM compras_detalle WHERE nIdCompra = ? AND bActivo = true", [req.params["id"]]);
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
            const object = yield database_1.default.query("SELECT v.nIdCompra,v.dFecha,v.nIdEmpleado,e.cNombre as cNombreEmpleado,v.nIdProveedor,p.cNombre as cNombreProveedor,v.nSubTotal,v.nIva,v.nTotal FROM compras v LEFT JOIN empleados e ON v.nIdEmpleado = e.nIdEmpleado LEFT JOIN proveedores p ON v.nIdProveedor = p.nIdProveedor WHERE v.bActivo = true");
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
            const id = req.body["nIdCompra"];
            const object = yield database_1.default.query("UPDATE compras SET ? WHERE nIdCompra = ?", [
                req.body['compra'],
                id
            ]);
            if (object.changedRows > 0) {
                yield database_1.default.query("DELETE FROM compras_detalle WHERE nIdCompra = ?", [id]);
                for (let det of req.body['lstDetalles']) {
                    yield database_1.default.query("INSERT INTO compras_detalle SET nIdCompra = ?, ?", [
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
            const object = yield database_1.default.query("INSERT INTO compras SET ?", [req.body['compra']]);
            if (object.affectedRows > 0) {
                const idcompra = yield database_1.default.query("SELECT MAX(nIdCompra) as id FROM compras");
                for (let det of req.body['lstDetalles']) {
                    yield database_1.default.query("INSERT INTO compras_detalle SET nIdCompra = ?, ?", [
                        idcompra[0].id, det
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
            const id = req.body["nIdCompra"];
            const object = yield database_1.default.query("UPDATE compras SET bActivo = false WHERE nIdCompra = ?", [id]);
            if (object.changedRows > 0) {
                yield database_1.default.query("UPDATE compras_detalle SET bActivo = false WHERE nIdCompra = ?", [id]);
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
const structController = new PurchasesController();
exports.default = structController;
