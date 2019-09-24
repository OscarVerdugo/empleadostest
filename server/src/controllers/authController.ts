import jwt from 'jwt-simple';
import moment from 'moment';
import keys from '../keys';

class AuthController{
    public createToken(user:any){
        const payload = {
            nIdUsuario: user.nIdUsuario,
            nIdEmpleado: user.nIdEmpleado,
            iat: moment().unix(),
            exp: moment().add(14,'days').unix()
        };
         return jwt.encode(payload,keys.SECRET_TOKEN);
    }
}

const authController = new AuthController();
export default authController;