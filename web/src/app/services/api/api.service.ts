import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Keys } from './keys';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { AuthService } from "../authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = this.keys.apiUrl;
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer '+this.auth.getToken()
    })
}
  constructor(private http: HttpClient, private keys: Keys, private auth: AuthService) {
  }

  // modules(token:string){
  //   return this.http.post(this.url+`modules`,{token:token}).pipe(map(data => data));
  // }

  insert(tab: string, obj: any): Observable<any> {
    console.log(JSON.stringify(obj));
    const params = new HttpParams({
      fromObject: {
        data:JSON.stringify(obj)
      }
    });
    return this.http.post(this.url + `${tab}`, params,this.headers).pipe(map(data => data));
  }
  update(tab: string, obj: any): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        data:JSON.stringify(obj)
      }
    });
    return this.http.put(this.url + `${tab}`, params,this.headers).pipe(map(data => data));
  }
  select(tab:string):Observable<any>{
    return this.http.get(this.url+`${tab}`,this.headers).pipe(map(data => data));
  }

  delete(tab: string, id:number): Observable<any> {
    return this.http.delete(this.url + `${tab}/${id}`,this.headers).pipe(map(data => data));
  }

  insertIncidencia(obj:any,cNumEmp:string){
    const params = new HttpParams({
      fromObject: {
        data:JSON.stringify(obj),
        cNumeroEmpleado:cNumEmp
      }
    });
    return this.http.post(this.url + `Incidencias`, params,this.headers).pipe(map(data => data));
  }

  selectIncidenciasEmp(cNumEmp:string):Observable<any>{
    const params = new HttpParams({
      fromObject: {
        cNumEmp:cNumEmp
      }
    });
    return this.http.post(this.url+`Incidencias/IncidenciasEmp`,params,this.headers).pipe(map(data => data));
  }

  selectIncidencia(id:number):Observable<any>{
    return this.http.get(this.url+`Incidencias/${id}`,this.headers).pipe(map(data => data));
  }






}
