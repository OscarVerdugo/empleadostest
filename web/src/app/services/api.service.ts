import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url="http://localhost:5000/";
  headers: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin':'*'
  });
  constructor(private http: HttpClient) { }


  getAll():Observable<any>{
    return this.http.get(this.url+"empleados-get").pipe(map(data => data));
  }

  // getOne(id):Observable<any>{
  //   return this.http.post(this.url+"/getAll",{id:id},{headers:this.headers}).pipe(map(data => data));
  // }

  deleteOne(id){
    return this.http.delete(this.url+`empleados-delete${id}`).pipe(map(data => data));
  }

  insert(emp){
    return this.http.post(this.url+"empleados-post",{id:1}).pipe(map(data => data));
  }




}
