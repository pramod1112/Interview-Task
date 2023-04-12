import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  private apiUrl = `https://jsonplaceholder.typicode.com`;

  constructor(private httpServ : HttpClient) {}

   getAllData(){
    return this.httpServ.get(this.apiUrl + '/todos')
   }
  
}
