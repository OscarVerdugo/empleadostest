"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeesController_1 = __importDefault(require("../controllers/employeesController"));
class EmployeesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', employeesController_1.default.index);
        this.router.post('/login', employeesController_1.default.login);
        this.router.post('/logout', employeesController_1.default.logout);
        this.router.get('/cons/:id', employeesController_1.default.cons);
        this.router.post('/se', employeesController_1.default.select);
        this.router.post('/up', employeesController_1.default.update);
        this.router.post('/ins', employeesController_1.default.insert);
        this.router.post('/del', employeesController_1.default.delete);
    }
}
const employeesRoutes = new EmployeesRoutes();
exports.default = employeesRoutes.router;
