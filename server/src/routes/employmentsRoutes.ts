import { Router } from 'express';
import EmploymentsController  from "../controllers/employmentsController";

class CustomersRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/',EmploymentsController.index);
        this.router.get('/cons/:id',EmploymentsController.cons);
        this.router.post('/se',EmploymentsController.select);
        this.router.post('/up',EmploymentsController.update);
        this.router.post('/ins',EmploymentsController.insert);
        this.router.post('/del',EmploymentsController.delete);
    }

}
const customersRoutes = new CustomersRoutes();
export default customersRoutes.router;
