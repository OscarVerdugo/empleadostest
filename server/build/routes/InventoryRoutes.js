"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventoryController_1 = __importDefault(require("../controllers/inventoryController"));
class CustomersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', inventoryController_1.default.index);
        // this.router.get('/cons/:id',inventoryController.cons);
        this.router.post('/se', inventoryController_1.default.select);
        this.router.post('/up', inventoryController_1.default.update);
        this.router.post('/ins', inventoryController_1.default.insert);
        // this.router.post('/del',inventoryController.delete);
    }
}
const customersRoutes = new CustomersRoutes();
exports.default = customersRoutes.router;
