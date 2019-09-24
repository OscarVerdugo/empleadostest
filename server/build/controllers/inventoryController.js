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
class InventoryController {
    index(req, res) {
        return res.json("listo");
    }
    //   public async cons(req: Request, res: Response) {
    //     const r = new Model();
    //     const object = await pool.query(
    //       "SELECT nIdCliente,cNombre,cDireccion,cNumTel,cRazonSocial,cNomEncargado,cNumTelEncargado,cCorreo FROM clientes WHERE bActivo = true AND nIdCliente = ?",
    //       [req.params["id"]]
    //     );
    //     if (object.length > 0) {
    //       r.data = object[0];
    //       r.message = "Exito";
    //     } else {
    //       r.bError = true;
    //       r.message = "Ninguno encontrado";
    //     }
    //     return res.json(r);
    //   }
    select(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            const object = yield database_1.default.query("SELECT i.nIdProducto,p.cDescripcion as cDescripcionProducto,i.nIdSucursal,s.cDescripcion as cDescripcionSucursal,p.nIdProveedor,pro.cNombre as cNombreProveedor,SUM(i.nCantidad) AS nCantidad FROM inventario i LEFT JOIN productos p ON i.nIdProducto = p.nIdProducto LEFT JOIN sucursales s ON i.nIdSucursal = s.nIdSucursal LEFT JOIN proveedores pro ON p.nIdProveedor = pro.nIdProveedor WHERE i.bActivo = true GROUP BY i.nIdProducto,i.nIdSucursal");
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
            const idproducto = req.body["nIdProducto"];
            const idsucursal = req.body["nIdSucursal"];
            const cantidad = req.body["nCantidad"];
            const object = yield database_1.default.query("UPDATE inventario SET bActivo = false WHERE nIdProdcto = ? AND nIdSucursal = ? AND nCantidad = ?", [idproducto, idsucursal, cantidad]);
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
            const object = yield database_1.default.query("INSERT INTO inventario SET ?", [req.body]);
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
}
const structController = new InventoryController();
exports.default = structController;
