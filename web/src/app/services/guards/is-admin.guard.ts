import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService){

  }
  async canActivate(): Promise<boolean> {
    return new Promise((resolve,reject) =>{
      this.auth.isAdmin().then(data => {
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
