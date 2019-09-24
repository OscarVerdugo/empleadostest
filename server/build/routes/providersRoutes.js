"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const providersController_1 = __importDefault(require("../controllers/providersController"));
class ProvidersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', providersController_1.default.index);
        this.router.get('/cons/:id', providersController_1.default.cons);
        this.router.post('/se', providersController_1.default.select);
        this.router.post('/up', providersController_1.default.update);
        this.router.post('/ins', providersController_1.default.insert);
        this.router.post('/del', providersController_1.default.delete);
    }
}
const providersRoutes = new ProvidersRoutes();
exports.default = providersRoutes.router;
