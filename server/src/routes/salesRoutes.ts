import { Router } from 'express';
import salesController from '../controllers/salesController';

class SalesRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/',salesController.index);
        this.router.get('/cons/:id',salesController.cons);
        this.router.post('/se',salesController.select);
        this.router.post('/up',salesController.update);
        this.router.post('/ins',salesController.insert);
        this.router.post('/del',salesController.delete);
    }

}
const salesRoutes = new SalesRoutes();
export default salesRoutes.router;
