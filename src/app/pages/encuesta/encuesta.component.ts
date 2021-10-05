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
  minimo:number=0;

  constructor(
    private encuestaService: EncuestaService,
    private fb: FormBuilder,
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
      nivelSatisfaccion: [3, Validators.required],
      ocio: ["", Validators.required],
      tipoJuegoPreferido: ["", Validators.required],
      sugerencia: ["", Validators.required],
    });
  }

  onSubmit()
  {
    console.log(this.userForm.value);
    
    this.encuestaService.addEncuesta(this.userForm.value).then(j =>
    {
      //Agregado Correctamente
    }).catch(error =>
    {
      console.log('Error', error);
      this.colorAlert = "alert-danger"
      this.mensaje = error.message;/* "Hubo un problema al registrarse" */
      this.submitted = true;
    });
  }

  test(){
    console.log(this.userForm.value);
  }

  navigate()
  {
    this.router.navigate(['/login']);
  }
}
