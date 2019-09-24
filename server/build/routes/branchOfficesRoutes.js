"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const branchofficesController_1 = __importDefault(require("../controllers/branchofficesController"));
class CustomersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', branchofficesController_1.default.index);
        this.router.get('/cons/:id', branchofficesController_1.default.cons);
        this.router.post('/se', branchofficesController_1.default.select);
        this.router.post('/up', branchofficesController_1.default.update);
        this.router.post('/ins', branchofficesController_1.default.insert);
        this.router.post('/del', branchofficesController_1.default.delete);
    }
}
const customersRoutes = new CustomersRoutes();
exports.default = customersRoutes.router;
