import { Injectable } from '@angular/core';
import { PrincipalService } from "./principal.service";
@Injectable({
  providedIn: 'root'
})
export class PaisesService
{

  constructor( private http:PrincipalService) { }


  public listar()
  {
    return this.http.get("https://restcountries.eu/rest/v2/all")
  }

  public listarPerros()
  {
    return this.http.get("https://api.thedogapi.com/v1/images/search").toPromise();
  }

}