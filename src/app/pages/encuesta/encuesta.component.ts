import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.sass']
})
export class EncuestaComponent implements OnInit
{

  userForm: FormGroup;
  submitted: boolean = false;
  mensaje: string;
  colorAlert: string;
  minimo: number = 0;

  constructor(
    private encuestaService: EncuestaService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  )
  {
    this.createForm();
  }

  ngOnInit(): void
  {
    this.authService.afAuth.authState.subscribe(user =>
    {
      this.userForm.controls['usuario'].setValue(user.email);
    })

  }

  createForm()
  {
    this.userForm = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      edad: ["", [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ["", [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      nivelSatisfaccion: [3, Validators.required],
      ocio: ["", Validators.required],
      tipoJuegoPreferido: ["", Validators.required],
      sugerencia: [""],
      usuario: [""]
    });
  }

  onSubmit()
  {
    this.encuestaService.addEncuesta(this.userForm.value).then(j =>
    {
      //Agregado Correctamente
      this.colorAlert = "alert-success"
      this.mensaje = "Muchas gracias por su tiempo"
      this.submitted = true;
      setTimeout(
        t =>
        {
          this.navigate();
        }, 2000
      )
    }).catch(error =>
    {
      console.log('Error', error);
      this.colorAlert = "alert-danger"
      this.mensaje = error.message;/* "Hubo un problema al registrarse" */
      this.submitted = true;
    });
  }

  navigate()
  {
    this.router.navigate(['']);
  }
}
