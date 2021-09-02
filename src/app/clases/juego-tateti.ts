import { Juego } from './juego';
import { User } from './Usuario';

export class JuegoTateti extends Juego {
    constructor(jugador?:User ) {
        super(null,"TaTeTi",false,jugador);      
      }
}