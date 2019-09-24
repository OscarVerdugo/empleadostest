"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employmentsController_1 = __importDefault(require("../controllers/employmentsController"));
class CustomersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', employmentsController_1.default.index);
        this.router.get('/cons/:id', employmentsController_1.default.cons);
        this.router.post('/se', employmentsController_1.default.select);
        this.router.post('/up', employmentsController_1.default.update);
        this.router.post('/ins', employmentsController_1.default.insert);
        this.router.post('/del', employmentsController_1.default.delete);
    }
}
const customersRoutes = new CustomersRoutes();
exports.default = customersRoutes.router;
