import { Juego } from '../clases/juego'
import { User } from './Usuario';

export class JuegoMemotest extends Juego {

    tiempo:any;

    cartaSeleccionada: any;
    cards:Array<any>=[];

    constructor(jugador?:User) {
        super(null,'Memotest',null,jugador);
    }

/*     public duplicarCartas(cartas:Array<any>) {
        var clone = new Array();
        cartas.forEach(card => {
            clone.push(card);
            console.log(card);
        });
        clone.forEach(c => {
            c.name = "duplicated" + c.name;
        })
        cartas = this.cards.concat(clone);
        console.log(clone);
        cartas.sort(function () { return Math.random() - 0.5 });
        return cartas;
    } */

    public verificarCarta(card?: any): boolean {
        if (card.numericCode && card.numericCode == this.cartaSeleccionada.numericCode) {
            return true;
        }
        else {
            return false;
        }
    }
    public verificarJuego(){
        var gameover = true;
        this.cards.forEach( card =>{
            if(!card.isTouched){
                gameover = false;
            }
        })
        return gameover;
    }

}
