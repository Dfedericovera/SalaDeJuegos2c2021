import { Juego } from '../clases/juego'
import { User } from './Usuario';

export class JuegoAhorcado extends Juego {

    suerte:any;
    public verificar(): boolean {
        throw new Error('Method not implemented.');
    }

    constructor(jugador?:User, gano?:boolean) {
        super(null,'Ahorcado',gano,jugador);
    }    

}
