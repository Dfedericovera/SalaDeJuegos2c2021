import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { JuegoMemotest } from "../../clases/juego-memotest";
import { JuegoService } from 'src/app/services/juego.service';
import { UserService } from 'src/app/services/users.service';
import { PaisesService } from 'src/app/services/paises.service';
import { AuthService } from 'src/app/services/auth.service';
import { removeEmitHelper } from 'typescript';


@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.scss'],
  animations: [
    trigger('cardState', [
      state('spin', style({
        transform: 'rotateY(360deg) rotateZ(0deg)',
      })),
      state('blank', style({
      })),
      transition('* => *', animate('500ms ease')),
    ])
  ]
})
export class MemotestComponent implements OnInit
{


  memotest: JuegoMemotest;
  isPlaying: boolean = false;
  segundos: number = 0;
  minutos: number = 0;
  contador: any;
  cantCartas: any;

  constructor(
    private jugadoresService: UserService,
    private juegoService: JuegoService,
    private paisesService: PaisesService,
    private authService: AuthService
  )
  {
    console.log(this.authService.user);
    this.memotest = new JuegoMemotest(this.jugadoresService.jugador);
  }

  ngOnInit(): void
  {
    var paises = new Array();
    this.paisesService.listar().toPromise().then(t=>{
      for (let i = 0; i < 10; i++)
      {
        paises.push(t[i]);
      }
      this.memotest.cards = this.duplicarCartas(paises);
    })

    /* .subscribe(t =>
    {
      for (let i = 0; i < 10; i++)
      {
        paises.push(t[i]);
      }
    }).add(t =>
    {
      this.memotest.cards = this.duplicarCartas(paises);
    }
    ) */
  }

  duplicarCartas(paises: Array<any>)
  {
    var clone = new Array();
    var cartas = new Array();
    paises.forEach(card=>{
      cartas.push(JSON.parse(JSON.stringify(card)));
      clone.push(JSON.parse(JSON.stringify(card)));
    })
    clone.forEach(c =>
    {
      c.name = "duplicated" + c.name;
      cartas.push( JSON.parse(JSON.stringify(c)));
    })
    console.log("original",paises);
    console.log("clon",clone);
    console.log("cartas",cartas);
    
/*     cartas = cartas.concat(clone);
    console.log(clone);
    cartas.sort(function () { return Math.random() - 0.5 }); */
    return cartas;
  }

  toggle(card)
  {
    if (!card.isTouched)
    {
      card.isTouched = !card.isTouched;
      //verificate
      this.verificarCarta(card);
    }
    else
    {
      return 0;
    }
  }

  verificarCarta(card)
  {
    setTimeout(t =>
    {
      if (this.memotest.cartaSeleccionada && this.memotest.cartaSeleccionada.name != card.name)
      {
        if (this.memotest.verificarCarta(card))
        {
          this.memotest.cartaSeleccionada = null;
          this.verificarJuego();
        } else
        {
          card.isTouched = false;
          this.memotest.cartaSeleccionada.isTouched = false;
          this.memotest.cartaSeleccionada = null;
        }
      }
      else
      {
        this.memotest.cartaSeleccionada = card;
      }
    }, 1000);
  }

  verificarJuego()
  {
    if (this.memotest.verificarJuego())
    {
      this.memotest.gano = true;
      clearInterval(this.contador);
      this.isPlaying = false;
      this.memotest.tiempo = this.minutos + 'min ' + this.segundos + 'seg';
      //Guardar Datos!!! y reiniciar el juego
      this.juegoService.addJuego(this.memotest)
    }
  }

  jugar()
  {

    this.isPlaying = true;
    this.contador = setInterval(t =>
    {
      this.segundos += 1;
      if (this.segundos == 60)
      {
        this.segundos = 0;
        this.minutos += 1;
      }
    }, 1000);
  }
  reiniciar()
  {
    this.memotest = new JuegoMemotest(this.jugadoresService.jugador);
    this.ngOnInit()
  }

}
