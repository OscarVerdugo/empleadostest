import { Router } from 'express';
import providersController from '../controllers/providersController';

class ProvidersRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/',providersController.index);
        this.router.get('/cons/:id',providersController.cons);
        this.router.post('/se',providersController.select);
        this.router.post('/up',providersController.update);
        this.router.post('/ins',providersController.insert);
        this.router.post('/del',providersController.delete);
    }

}
const providersRoutes = new ProvidersRoutes();
export default providersRoutes.router;
