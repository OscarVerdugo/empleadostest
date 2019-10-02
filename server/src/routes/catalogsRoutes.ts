import { Router } from 'express';
import CatalogsController  from "../controllers/catalogsController";

class CatalogsRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        // this.router.post('/',BranchofficesController.index);
        // this.router.post('/cons/:id',BranchofficesController.cons);
        this.router.post('/select',CatalogsController.select);
        // this.router.post('/update',BranchofficesController.update);
        // this.router.post('/insert',BranchofficesController.insert);
        // this.router.post('/delete',BranchofficesController.delete);
    }

}
const catalogsRoutes = new CatalogsRoutes();
export default catalogsRoutes.router;
