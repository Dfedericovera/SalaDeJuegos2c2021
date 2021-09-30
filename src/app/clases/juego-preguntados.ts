import { Juego } from '../clases/juego'
import { User } from './Usuario';

export class JuegoPreguntados extends Juego {

    aciertos:any;
    public verificar(): boolean {
        throw new Error('Method not implemented.');
    }

    constructor(jugador?:User) {
        super(null,'Preguntados',null,jugador);
    }    

}