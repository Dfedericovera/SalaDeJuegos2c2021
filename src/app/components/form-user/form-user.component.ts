import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileI } from 'src/app/interface/file';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.sass']
})
export class FormUserComponent implements OnInit
{

  userForm: FormGroup;
  photo1: FileI;
  photo2: FileI;
  photos: Array<FileI> = new Array();
  submitted: boolean = false;
  mensaje:string;
  colorAlert:string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  )
  {
    this.createForm();
  }

  ngOnInit(): void
  {
  }

  createForm()
  {
    this.userForm = this.fb.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit()
  {
    try
    {
      this.authService.register(this.userForm.controls.email.value, this.userForm.controls.password.value).then(user =>
      {
        if (user)
        {
          this.userService.createUser(this.userForm.value, this.photos).then(user =>
          {
            console.log('Registrado correctamente');
            this.colorAlert = "alert-success"
            this.mensaje = "Registrado correctamente";
            this.submitted = true;
            setTimeout(t =>{
              this.authService.login(this.userForm.controls.email.value,this.userForm.controls.password.value).then(t=>{
                this.router.navigate(["/home"]);
              })              
            },2000)            
          });
        }
      }).catch(error =>
      {
        console.log('Error', error);
        this.colorAlert = "alert-danger"
        this.mensaje = error.message;/* "Hubo un problema al registrarse" */
        this.submitted = true;
      });

    } catch (error)
    {
      console.log('Error fuera', error);
    }
  }

  navigate()
  {
    this.router.navigate(['/login']);
  }




}
