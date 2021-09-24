import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit
{

  gameOver: boolean = false;
  perro: any;
  opciones: Array<string> = [];
  aciertos = 0;

  constructor(
    private paisesService: PaisesService,
  ) { }

  ngOnInit(): void
  {
    this.cargarRespuesta();

  }

  cargarRespuesta()
  {
    this.paisesService.listarPerros().then(dogs =>
    {
      if (dogs[0].breeds[0] != undefined)
      {
        this.perro = dogs;
        console.log(this.perro[0].breeds[0].name);
        this.cargarOpciones();
      }
      else
      {
        this.cargarRespuesta();
      }
    })
  }

  cargarOpciones()
  {
    this.opciones = [];
    this.opciones.push(this.perro[0].breeds[0].name);
    for (let i = 0; i < 3; i++)
    {
      this.cargarOpcion();
    }
  }

  cargarOpcion()
  {
    this.paisesService.listarPerros().then(dogs =>
    {
      if (dogs[0].breeds[0] != undefined)
      {
        this.opciones.push(dogs[0].breeds[0].name);
      }
      else
      {
        this.cargarOpcion();
      }

      if (this.opciones.length > 3)
      {
        this.mezclarArray(this.opciones);
      }
    })
  }


  comprobar(respuesta)
  {
    console.log(respuesta);
    if (respuesta == this.perro[0].breeds[0].name)
    {
      console.log("GANO");
      this.aciertos++;
      this.cargarRespuesta();
    }
    else
    {
      console.log("Perdio");
      this.gameOver = true;
    }
  }

  reiniciar()
  {
    this.cargarRespuesta();
    this.gameOver = false;
    this.aciertos = 0;
  }

  mezclarArray(array: Array<any>)
  {
    console.log(array.length);
    var n = array.length, i = -1, j;
    var t;
    while (++i < n)
    {
      j = Math.floor(Math.random() * n);
      t = array[j];
      array[j] = array[i];
      array[i] = t;
    }

    console.log(array);
  }

}
