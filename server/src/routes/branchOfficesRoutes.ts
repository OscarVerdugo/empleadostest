import { Router } from 'express';
import BranchofficesController  from "../controllers/branchofficesController";

class CustomersRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/',BranchofficesController.index);
        this.router.get('/cons/:id',BranchofficesController.cons);
        this.router.post('/se',BranchofficesController.select);
        this.router.post('/up',BranchofficesController.update);
        this.router.post('/ins',BranchofficesController.insert);
        this.router.post('/del',BranchofficesController.delete);
    }

}
const customersRoutes = new CustomersRoutes();
export default customersRoutes.router;
