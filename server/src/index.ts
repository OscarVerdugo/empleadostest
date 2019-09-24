import express , { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
// import employeesRoutes from './routes/employeesRoutes';
import catalogsRoutes from './routes/catalogsRoutes';
import productsRoutes from './routes/productsRoutes';
import providersRoutes from './routes/providersRoutes';
import customersRoutes from './routes/customersRoutes';
import branchofficeRoutes from "./routes/branchOfficesRoutes";
import employmentsRoutes from "./routes/employmentsRoutes";
import salesRoutes from "./routes/salesRoutes";
import purchasesRoutes from "./routes/purchasesRoutes";
import inventoryRoutes from "./routes/InventoryRoutes";


class Server{
    public app : Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    config() : void{
        this.app.set('port',process.env.PORT || 5000);
        this.app.use(morgan('dev'));
        this.app.use(cors()); 
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }
    routes() : void {
        this.app.use('/',indexRoutes);

        this.app.use('/rh/catalogs',catalogsRoutes);
        // this.app.use('/api/products',productsRoutes);
        // this.app.use('/api/providers',providersRoutes);
        // this.app.use('/api/customers',customersRoutes);
        // this.app.use('/api/branchoffice',branchofficeRoutes);
        // this.app.use('/api/employments',employmentsRoutes);
        // this.app.use('/api/sales',salesRoutes);
        // this.app.use('/api/purchases',purchasesRoutes);
        // this.app.use('/api/inventory',inventoryRoutes);


    }
    start() : void {
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on port ' + this.app.get('port'));
        });
    }
}

const server = new Server(); 
server.start();

