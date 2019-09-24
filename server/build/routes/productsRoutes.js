"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = __importDefault(require("../controllers/productsController"));
class ProductsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', productsController_1.default.index);
        this.router.get('/cons/:id', productsController_1.default.cons);
        this.router.post('/se', productsController_1.default.select);
        this.router.post('/up', productsController_1.default.update);
        this.router.post('/ins', productsController_1.default.insert);
        this.router.post('/del', productsController_1.default.delete);
    }
}
const productsRoutes = new ProductsRoutes();
exports.default = productsRoutes.router;
