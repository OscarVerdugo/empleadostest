import { Router } from 'express';
import inventoryController from '../controllers/inventoryController';

class CustomersRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/',inventoryController.index);
        // this.router.get('/cons/:id',inventoryController.cons);
        this.router.post('/se',inventoryController.select);
        this.router.post('/up',inventoryController.update);
        this.router.post('/ins',inventoryController.insert);
        // this.router.post('/del',inventoryController.delete);
    }

}
const customersRoutes = new CustomersRoutes();
export default customersRoutes.router;
