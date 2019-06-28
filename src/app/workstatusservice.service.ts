import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkstatusserviceService {
  url = 'http://localhost:8999/CNGWorkStatus';


  constructor(private httpClient:HttpClient) { }

  loginUser(data){
    return this.httpClient.post(this.url+"/loginUser",data);
  }

  getWorkStatusInfo(data){
    return this.httpClient.post(this.url+"/getWorkStatusInfo",data);
  }

 saveOrUpdateWorkStatusInfo(data){
    return this.httpClient.post(this.url+"/saveWorkStatus",data);
  }

  generateReport(data){
    return this.httpClient.post(this.url+"/workStatusReport",data);
  }
 
}
