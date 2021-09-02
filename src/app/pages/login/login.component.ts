import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit
{

  loginForm: FormGroup;
  mensaje: string;
  submitted: boolean;
  colorAlert:string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { this.createForm() }

  ngOnInit(): void
  {
  }

  createForm()
  {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onLogin()
  {
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then(user =>
    {
      this.colorAlert = "alert-success"
      this.mensaje = "Verificado✓";
      this.submitted = true;
      setTimeout(t=>{
        this.router.navigate(['/home']);
      },2000)
    }).catch(error =>
    {
      this.colorAlert = "alert-danger"
      this.mensaje = error.message;
      this.submitted = true;
      console.log('Usuario no registrado', error)
    })
  }

  entrarComoAnonimo()
  {
    this.authService.loginAnonymously().then(value => { console.log(value); this.router.navigate(['/home']); });
  }
  
  entrarComoAdmin(){
    this.loginForm.controls.email.setValue("admin@admin.com");
    this.loginForm.controls.password.setValue("111111");
  }


}
