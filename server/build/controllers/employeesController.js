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
const authController_1 = __importDefault(require("./authController"));
const database_1 = __importDefault(require("../database"));
class EmployeesController {
    index(req, res) {
        res.json("prueba");
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            const object = yield database_1.default.query("SELECT nIdUsuario,cLogin,cPassword,nIdEmpleado,bOnline FROM usuarios WHERE cLogin = ? AND bActivo = true", [req.body["cLogin"]]);
            if (object.length > 0) {
                if (req.body["cPassword"] == object[0].cPassword) {
                    if (!object[0].bOnline) {
                        yield database_1.default.query("UPDATE usuarios SET bOnline = true WHERE nIdUsuario = ?", [object[0].nIdUsuario]);
                        let resData = yield database_1.default.query('SELECT u.cLogin,e.nIdEmpleado,e.cNombre,e.nIdSucursal,s.cDescripcion as cDescripcionSucursal,p.cDescripcion as cDescripcionPuesto FROM usuarios u LEFT JOIN empleados e ON u.nIdEmpleado = e.nIdEmpleado LEFT JOIN puestos p ON p.nIdPuesto = e.nIdPuesto LEFT JOIN sucursales s ON s.nIdSucursal = e.nIdSucursal WHERE e.nIdEmpleado = ? ', object[0].nIdEmpleado);
                        r.data = resData[0];
                        r.token = authController_1.default.createToken(object[0]);
                        return res.json(r);
                    }
                    else {
                        r.message = "Usuario en uso.";
                    }
                }
                else {
                    r.message = "Contraseña incorrecta.";
                }
            }
            else {
                r.message = "Usuario incorrecto.";
            }
            r.bError = true;
            return res.json(r);
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            const { nIdUsuario } = req.body;
            const object = yield database_1.default.query("UPDATE usuarios SET bOnline = false WHERE nIdUsuario = ?", [nIdUsuario]);
            if (object.changedRows > 0) {
                r.message = "Logout";
            }
            else {
                r.message = "Error";
                r.bError = true;
            }
            return res.json(r);
        });
    }
    // public async consSucursal(req: Request, res: Response) {
    //   const r = new Model();
    //   const nIdSucursal = req.params["id"];
    //   const object = await pool.query(
    //     "SELECT nIdEmpleado,cNombre,cTurno,nIdPuesto,nIdSucursal FROM empleados WHERE nIdSucursal = ? AND bActivo = true",
    //     [nIdSucursal]
    //   );
    //   console.log(object);
    //   if (object.length <= 0) {
    //     r.bError = true;
    //     r.message = "No hay empleados.";
    //     return res.json(r);
    //   } else {
    //     r.data = object;
    //     r.message = "Exito";
    //     return res.json(r);
    //   }
    // }
    cons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = new modelController_1.default();
            const object = yield database_1.default.query("SELECT e.nIdEmpleado,e.cNss,e.cNombre,e.dFechaNacimiento,e.cEstadoCivil,e.cTurno,pu.cDescripcion as cDescripcionPuesto,pu.nIdPuesto,e.cCorreo,e.cRfc,su.nIdSucursal,su.cDescripcion as cDescripcionSucursal FROM  empleados e LEFT JOIN sucursales su ON e.nIdSucursal = su.nIdSucursal LEFT JOIN puestos pu ON pu.nIdPuesto = e.nIdPuesto WHERE e.nIdEmpleado = ? AND p.bActivo = true", [req.params["id"]]);
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
            const object = yield database_1.default.query("SELECT e.nIdEmpleado,e.cNss,e.cNombre,e.dFechaNacimiento,e.cEstadoCivil,e.cTurno,pu.cDescripcion as cDescripcionPuesto,pu.nIdPuesto,e.cCorreo,e.cRfc,su.nIdSucursal,su.cDescripcion AS cDescripcionSucursal FROM  empleados e LEFT JOIN sucursales su ON e.nIdSucursal = su.nIdSucursal LEFT JOIN puestos pu ON pu.nIdPuesto = e.nIdPuesto WHERE e.bActivo = true");
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
            const id = req.body["nIdEmpleado"];
            const object = yield database_1.default.query("UPDATE empleados SET ? WHERE nIdEmpleado = ?", [req.body, id]);
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
            const object = yield database_1.default.query("INSERT INTO empleados SET ?", req.body);
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
            const id = req.body["nIdEmpleado"];
            const object = yield database_1.default.query("UPDATE empleados SET bActivo = false WHERE nIdEmpleado = ?", id);
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
const employeesController = new EmployeesController();
exports.default = employeesController;
