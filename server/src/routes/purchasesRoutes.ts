import { Router } from 'express';
import purchasesController from '../controllers/purchasesController';

class SalesRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/',purchasesController.index);
        this.router.get('/cons/:id',purchasesController.cons);
        this.router.post('/se',purchasesController.select);
        this.router.post('/up',purchasesController.update);
        this.router.post('/ins',purchasesController.insert);
        this.router.post('/del',purchasesController.delete);
    }

}
const salesRoutes = new SalesRoutes();
export default salesRoutes.router;
