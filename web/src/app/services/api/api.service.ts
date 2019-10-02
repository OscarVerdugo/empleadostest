import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Keys } from './keys';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = this.keys.apiUrl;
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    })
}
  constructor(private http: HttpClient, private keys: Keys) {
  }


  // select(token:string,pag:number,pagSize:number,tab:string):Observable<any>{
  //   return this.http.post(this.url+`select`,{tab:tab,pag:pag,pagSize:pagSize}).pipe(map(data => data));
  // }

  // delete(id:number,tab:string):Observable<any>{
  //   return this.http.post(this.url+`delete`,{id:id,tab:tab}).pipe(map(data => data));
  // }

  // insert(obj:any,tab:string):Observable<any>{;
  //   return this.http.post(this.url+`insert`,{obj:obj,tab:tab}).pipe(map(data => data));
  // }

  // update(id:number,obj:any,tab:string):Observable<any>{;
  //   return this.http.post(this.url+`update`,{obj:obj,id:id,tab:tab}).pipe(map(data => data));
  // }

  // modules(token:string){
  //   return this.http.post(this.url+`modules`,{token:token}).pipe(map(data => data));
  // }

  insert(tab: string, obj: any): Observable<any> {
    console.log(JSON.stringify(obj));
    const params = new HttpParams({
      fromObject: {
        data:JSON.stringify(obj),
        token:"NIISDN9ADUBN1DB102DBBDF0IAFB0IAFBI0FB"
      }
    });
    return this.http.post(this.url + `${tab}`, params,this.headers).pipe(map(data => data));
  }
  select(tab:string):Observable<any>{
    return this.http.get(this.url+`${tab}`).pipe(map(data => data));
  }






}
