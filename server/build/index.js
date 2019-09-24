"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
// import employeesRoutes from './routes/employeesRoutes';
const catalogsRoutes_1 = __importDefault(require("./routes/catalogsRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/rh/catalogs', catalogsRoutes_1.default);
        // this.app.use('/api/products',productsRoutes);
        // this.app.use('/api/providers',providersRoutes);
        // this.app.use('/api/customers',customersRoutes);
        // this.app.use('/api/branchoffice',branchofficeRoutes);
        // this.app.use('/api/employments',employmentsRoutes);
        // this.app.use('/api/sales',salesRoutes);
        // this.app.use('/api/purchases',purchasesRoutes);
        // this.app.use('/api/inventory',inventoryRoutes);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ' + this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
