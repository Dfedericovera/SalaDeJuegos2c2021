import { User } from './Usuario';

export class Juego
{
  public id: string;
  public nombreJuego = 'Sin Nombre';
  public jugador: User;
  public fecha: any
  public hora: any;
  public date
  public gano;

  constructor(id?: string, nombreDelJuego?: string, gano?: boolean, jugador?: User)
  {
    this.date = Date.now();
    if (nombreDelJuego)
      this.nombreJuego = nombreDelJuego;
    if (id)
      this.id = id;
    if (gano)
      this.gano = gano;
    if (jugador)
      this.jugador = jugador;
  }







}
