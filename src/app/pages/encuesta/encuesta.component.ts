import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.sass']
})
export class EncuestaComponent implements OnInit {

  userForm: FormGroup;
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
          /* this.userService.createUser */
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
