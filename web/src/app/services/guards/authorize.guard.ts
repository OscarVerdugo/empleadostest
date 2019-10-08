import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router
} from "@angular/router";
import { AuthService } from "../authentication/auth.service";


@Injectable({
  providedIn: "root"
})
export class AuthorizeGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}

  async canActivate(): Promise<boolean> {
    return new Promise((resolve,reject) =>{
      this.auth.validateToken().then(data => {
        console.log(data);
        if(data['bError']){
          this.auth.logOut();
          resolve(false);
        }else{
          resolve(true);
        }
      }).catch(err =>{
        resolve(false);
      });
    });
  }
}
