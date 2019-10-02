"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catalogsController_1 = __importDefault(require("../controllers/catalogsController"));
class CatalogsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // this.router.post('/',BranchofficesController.index);
        // this.router.post('/cons/:id',BranchofficesController.cons);
        this.router.post('/select', catalogsController_1.default.select);
        // this.router.post('/update',BranchofficesController.update);
        // this.router.post('/insert',BranchofficesController.insert);
        // this.router.post('/delete',BranchofficesController.delete);
    }
}
const catalogsRoutes = new CatalogsRoutes();
exports.default = catalogsRoutes.router;
