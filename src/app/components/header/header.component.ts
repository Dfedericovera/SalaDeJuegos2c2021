import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  email:string;

  constructor(private authService:AuthService, private router:Router) {

    authService.getUserAuth().subscribe(
      user=>{
        this.email = user.email
      }
    )
    
   }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.removeItem("user");
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
