import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(private authService:AuthService, private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    console.log("estoy verificando el ruteo!", state.toString(), state.url);
    if(this.checkUser()){
      return true
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
    return this.checkUser();
  }

  checkUser():boolean{
    return this.authService.isLoggedIn
    
  }

}
