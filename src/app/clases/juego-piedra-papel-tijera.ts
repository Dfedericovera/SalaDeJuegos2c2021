import { Juego } from './juego';
import { User } from './Usuario';

export class JuegoPiedraPapelTijera extends Juego {
    constructor(jugador?:User ) {
        super(null,"Piedra Paple o Tijera",false,jugador);      
      }
}
