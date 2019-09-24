import { Router } from 'express';
import employeesController from '../controllers/employeesController';

class EmployeesRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',employeesController.index);
        this.router.post('/login',employeesController.login);
        this.router.post('/logout',employeesController.logout);
        this.router.get('/cons/:id',employeesController.cons);
        this.router.post('/se',employeesController.select);
        this.router.post('/up',employeesController.update);
        this.router.post('/ins',employeesController.insert);
        this.router.post('/del',employeesController.delete);
    }

}
const employeesRoutes = new EmployeesRoutes();
export default employeesRoutes.router;





