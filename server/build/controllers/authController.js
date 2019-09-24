"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const moment_1 = __importDefault(require("moment"));
const keys_1 = __importDefault(require("../keys"));
class AuthController {
    createToken(user) {
        const payload = {
            nIdUsuario: user.nIdUsuario,
            nIdEmpleado: user.nIdEmpleado,
            iat: moment_1.default().unix(),
            exp: moment_1.default().add(14, 'days').unix()
        };
        return jwt_simple_1.default.encode(payload, keys_1.default.SECRET_TOKEN);
    }
}
const authController = new AuthController();
exports.default = authController;
