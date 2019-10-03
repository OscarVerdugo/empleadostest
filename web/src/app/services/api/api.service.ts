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
  update(tab: string, obj: any): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        data:JSON.stringify(obj),
        token:"NIISDN9ADUBN1DB102DBBDF0IAFB0IAFBI0FB"
      }
    });
    return this.http.put(this.url + `${tab}`, params,this.headers).pipe(map(data => data));
  }
  select(tab:string):Observable<any>{
    return this.http.get(this.url+`${tab}`).pipe(map(data => data));
  }

  delete(tab: string, id:number): Observable<any> {
    return this.http.delete(this.url + `${tab}/${id}`,this.headers).pipe(map(data => data));
  }






}
