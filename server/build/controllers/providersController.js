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
class ProvidersController {
    index(req, res) {
        return res.json("listo");
    }
    cons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            const object = yield database_1.default.query("SELECT nIdProveedor,cNombre,cNumTel,cEncargado,cNumEncargado,cNumEncargado,cCorreo FROM proveedores WHERE nIdProveedor = ? AND bActivo = true", [req.params["id"]]);
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
            const object = yield database_1.default.query("SELECT nIdProveedor,cNombre,cNumTel,cEncargado,cNumEncargado,cNumEncargado,cCorreo FROM proveedores WHERE bActivo = true");
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
            const id = req.body["nIdProveedor"];
            const object = yield database_1.default.query("UPDATE proveedores SET ? WHERE nIdProveedor = ?", [req.body, id]);
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
            const object = yield database_1.default.query("INSERT INTO proveedores SET ?", req.body);
            if (object.affectedRows > 0) {
                r.message = "Agregado con exito";
            }
            else {
                r.bError = true;
                r.message = "Error al agregar";
            }
            return res.json(r);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            const id = req.body["nIdProveedor"];
            const object = yield database_1.default.query("UPDATE proveedores SET bActivo = false WHERE nIdProveedor = ?", id);
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
const providersController = new ProvidersController();
exports.default = providersController;
