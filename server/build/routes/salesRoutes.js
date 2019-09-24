"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salesController_1 = __importDefault(require("../controllers/salesController"));
class SalesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', salesController_1.default.index);
        this.router.get('/cons/:id', salesController_1.default.cons);
        this.router.post('/se', salesController_1.default.select);
        this.router.post('/up', salesController_1.default.update);
        this.router.post('/ins', salesController_1.default.insert);
        this.router.post('/del', salesController_1.default.delete);
    }
}
const salesRoutes = new SalesRoutes();
exports.default = salesRoutes.router;
