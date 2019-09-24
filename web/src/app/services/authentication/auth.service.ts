import { Injectable } from '@angular/core';
import { Keys } from "../api/keys";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url= this.keys.apiUrl;
  headers: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin':'*'
  });
  constructor(private keys: Keys, private http: HttpClient  ) { }

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
            resolve({bError:false,bAdmin:data['bAdmin']});
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
          this.saveToken(data['token']);
          resolve({bError:false});
        }
      });
    });
  }


  private apiAuth(token:string):Observable<any>{
   return this.http.post(this.url+`auth`,{token:token}).pipe(map(data => data));
  }

  private apiLogin(us:string,pass:string):Observable<any>{
    return this.http.post(this.url + `login`,{us:us,pass:pass}).pipe(map(data => data));
  }

  private saveToken(token:string){
    localStorage.setItem('HCCToken',token);
  }

  private removeToken(){
    localStorage.removeItem('HCCToken');
  }

  private getToken():string{
    return localStorage.getItem('HCCToken');
  }

}
