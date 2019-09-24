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
class ProductsController {
    index(req, res) {
        return res.json("listo");
    }
    cons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            const object = yield database_1.default.query("SELECT p.nIdProducto,p.cDescripcion,p.nPrecio,p.cUnidad,p.nIdProveedor,pv.cNombre as cDescripcionProveedor FROM productos p LEFT JOIN proveedores pv ON p.nIdProveedor = pv.nIdProveedor WHERE p.nIdProducto = ? AND p.bActivo = true", [req.params["id"]]);
            if (object.length > 0) {
                r.data = object[0];
                r.message = "Exito";
            }
            else {
                r.bError = true;
                r.message = "Ninguno encontrado";
            }
            return res.json(r);
        });
    }
    select(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            const object = yield database_1.default.query("SELECT p.nIdProducto,p.cDescripcion,p.nPrecio,p.cUnidad,p.nIdProveedor,pv.cNombre as cDescripcionProveedor FROM productos p LEFT JOIN proveedores pv ON p.nIdProveedor = pv.nIdProveedor WHERE p.bActivo = true");
            if (object.length > 0) {
                r.data = object;
                r.message = "Exito";
            }
            else {
                r.bError = true;
                r.message = "Ninguno encontrado";
            }
            return res.json(r);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            const id = req.body["nIdProducto"];
            const object = yield database_1.default.query("UPDATE productos SET ? WHERE nIdProducto = ?", [req.body, id]);
            if (object.changedRows > 0) {
                r.message = "Actualizado con exito";
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
            const object = yield database_1.default.query("INSERT INTO productos SET ?", req.body);
            if (object.affectedRows > 0) {
                r.message = "Agregado con exito";
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
            const id = req.body["nIdProducto"];
            const object = yield database_1.default.query("UPDATE productos SET bActivo = false WHERE nIdProducto = ?", id);
            if (object.changedRows > 0) {
                r.message = "Eliminado con exito";
            }
            else {
                r.bError = true;
                r.message = "Error al eliminar";
            }
            return res.json(r);
        });
    }
}
const productsController = new ProductsController();
exports.default = productsController;
