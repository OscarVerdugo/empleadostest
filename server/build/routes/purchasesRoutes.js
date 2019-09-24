"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchasesController_1 = __importDefault(require("../controllers/purchasesController"));
class SalesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', purchasesController_1.default.index);
        this.router.get('/cons/:id', purchasesController_1.default.cons);
        this.router.post('/se', purchasesController_1.default.select);
        this.router.post('/up', purchasesController_1.default.update);
        this.router.post('/ins', purchasesController_1.default.insert);
        this.router.post('/del', purchasesController_1.default.delete);
    }
}
const salesRoutes = new SalesRoutes();
exports.default = salesRoutes.router;
