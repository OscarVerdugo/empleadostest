import { Router } from 'express';
import productsController from "../controllers/productsController";

class ProductsRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/',productsController.index);
        this.router.get('/cons/:id',productsController.cons);
        this.router.post('/se',productsController.select);
        this.router.post('/up',productsController.update);
        this.router.post('/ins',productsController.insert);
        this.router.post('/del',productsController.delete);
    }

}
const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;





