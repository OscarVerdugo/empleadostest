import { Router } from 'express';
import customersController from '../controllers/customersController';

class CustomersRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/',customersController.index);
        this.router.get('/cons/:id',customersController.cons);
        this.router.post('/se',customersController.select);
        this.router.post('/up',customersController.update);
        this.router.post('/ins',customersController.insert);
        this.router.post('/del',customersController.delete);
    }

}
const customersRoutes = new CustomersRoutes();
export default customersRoutes.router;
