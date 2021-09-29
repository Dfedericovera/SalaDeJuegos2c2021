import { Juego } from '../clases/juego'
import { User } from './Usuario';

export class JuegoMayorOMenor extends Juego {

    suerte:any;
    public verificar(): boolean {
        throw new Error('Method not implemented.');
    }

    constructor(jugador?:User) {
        super(null,'Mayor o Menor',null,jugador);
    }    

}