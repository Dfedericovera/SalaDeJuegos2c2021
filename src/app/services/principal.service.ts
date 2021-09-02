import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/form-data','boundary':'----WebKitFormBoundaryyrV7KO0BoCBuDbTL'
  })/* application/json */
};

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor( private httpClient: HttpClient) { }

  //llamadas con httpClient
  public get(url:string) {
    return this.httpClient
      .get(url)
      
  }
  public post(url:string, obj:any) {
    return this.httpClient
        .post(url, obj)
    
  }
  public postFormData(url:string, obj:any){
    return this.httpClient.post(url,obj)
  }


  private extractData(res: Response) {
    return res.json() || {};
  }

  private handleError(error: Response | any) {
    return error;
  }
}