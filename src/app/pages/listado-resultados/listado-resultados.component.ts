import { Component, Input, OnInit } from '@angular/core';
import { Juego } from 'src/app/clases/juego';
import { JuegoCaraoceca } from 'src/app/clases/juego-caraoseca';
import { JuegoMemotest } from 'src/app/clases/juego-memotest';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-listado-resultados',
  templateUrl: './listado-resultados.component.html',
  styleUrls: ['./listado-resultados.component.scss']
})
export class ListadoResultadosComponent implements OnInit {

  @Input()
  listado: Array<any>;
 
 
   constructor(private juegosService:JuegoService) {
    }
 
   ngOnInit() {
     this.TraerTodos();
   }
 
   TraerTodos(){
     /* this.listado = this.juegosService.juegos; */
     this.juegosService.getJuegos().subscribe(juegos=>{
       this.listado = juegos;
     })
   }
   TraerGanadores(){
     this.listado = this.juegosService.juegos;
     this.listado = this.listado.filter((juego:Juego)=>{
       if(juego.gano == true||juego instanceof JuegoMemotest || juego instanceof JuegoCaraoceca){
         return juego
       }
     })
   }
   TraerPerdedores(){
     this.listado = this.juegosService.juegos;
     this.listado = this.listado.filter((juego:Juego)=>{
       if(juego.gano == false){
         return juego
       }
     })
   }

}
