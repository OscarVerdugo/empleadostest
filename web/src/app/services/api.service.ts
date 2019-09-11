import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url="work-in-progress";
  headers: HttpHeaders = new HttpHeaders({
    "Content-type":"application/json"
  });
  constructor(private http: HttpClient) { }


  getAll():Observable<any>{
    return this.http.get(this.url+"/getAll",{headers:this.headers}).pipe(map(data => data));
  }

  getOne(id):Observable<any>{
    return this.http.post(this.url+"/getAll",{id:id},{headers:this.headers}).pipe(map(data => data));
  }




}
