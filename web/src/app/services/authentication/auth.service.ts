import { Injectable } from '@angular/core';
import { Keys } from "../api/keys";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url= this.keys.apiUrl;
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    })
}
  constructor(private keys: Keys, private http: HttpClient, private router: Router  ) { }

  validateToken():Promise<any>{
   let token = this.getToken();
    return new Promise((resolve, reject) =>{
      if(token){
        this.apiAuth(token).subscribe(data =>{
          console.log(data);
          if(data['bError']){
            this.removeToken();
            resolve({bError:true});
          }else{
            resolve({bError:false});
          }
        });
      }else{
        resolve({bError:true});
      }
    });
  }

  isAdmin():Promise<any>{
    let token = this.getToken();
    return new Promise((resolve, reject) =>{
      if(token){
        this.apiIsAdmin(token).subscribe(data =>{
          console.log(data);
          if(data['bError']){
            resolve({bError:true});
          }else{
            resolve({bError:false});
          }
        });
      }else{
        resolve({bError:true});
      }
    });
  }

  loginUser(us:string,pass:string):Promise<any>{
    return new Promise((resolve, reject)=>{
      this.apiLogin(us,pass).subscribe(data =>{
        if(data['bError']){
          resolve({bError:true});
        }else{
          this.setToken(data['cToken']);
          let userData = JSON.parse(data['cPayload']);
          localStorage.setItem("HCC:Nombre",userData['cNombres']);
          localStorage.setItem("HCC:PApellido",userData['cPApellido']);
          localStorage.setItem("HCC:SApellido",userData['cSApellido']);
          localStorage.setItem("HCC:NumeroEmpleado",userData['cNumeroEmpleado']);


          resolve({bError:false});
        }
      });
    });
  }

  logOut(){
    localStorage.removeItem("HCCToken");
    localStorage.removeItem("HCC:cNombres");
    localStorage.removeItem("HCC:cPApellido");
    localStorage.removeItem("HCC:cSApellido");
    localStorage.removeItem("HCC:cNumeroEpleado");

    this.router.navigate(['/login']);
  }


  private apiAuth(token:string):Observable<any>{
    const params = new HttpParams({
      fromObject: {
        data:JSON.stringify({cToken:token})
      }
    });
   return this.http.post(this.url+`Usuarios/VerifyUser`,params,this.headers).pipe(map(data => data));
  }

  private apiIsAdmin(token:string):Observable<any>{
    const params = new HttpParams({
      fromObject: {
        data:JSON.stringify({cToken:token})
      }
    });
   return this.http.post(this.url+`Usuarios/isAdmin`,params,this.headers).pipe(map(data => data));
  }

  private apiLogin(num:string,pass:string):Observable<any>{
    const params = new HttpParams({
      fromObject: {
        data:JSON.stringify({cNumeroEmpleado:num,cContra:pass})
      }
    });
    return this.http.post(this.url + `Usuarios/AuthUser`,params,this.headers).pipe(map(data => data));
  }

  private setToken(token:string){
    localStorage.setItem('HCCToken',token);
  }

  private removeToken(){
    localStorage.removeItem('HCCToken');
  }

  getToken():string{
    return localStorage.getItem('HCCToken');
  }

}
