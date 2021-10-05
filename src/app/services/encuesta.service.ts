import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Encuesta } from '../clases/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService
{

  public encuestas: Array<Encuesta>;
  constructor(private db: AngularFirestore)
  {
  }

  ngOnInit()
  {
  }

  //Devuelve un Observable de tipo Encuesta Array.
  getEncuestas(): Observable<Encuesta[]>
  {
    console.log("Get encuestas;")
    return this.db.collection("encuestas", (ref) =>
      ref.orderBy('date')).snapshotChanges().pipe(
        map((snaps) =>
          snaps.map((snap) =>
          {
            return snap.payload.doc.data() as Encuesta;
          }))
      )
  }

  //Metodo para crear un nuevo Encuesta en la DB
  addEncuesta(encuesta: Encuesta)
  {
    //?no hay que pensar en endpoints o si esta o no creada la tabla.
    //?Adicionamos un nuevo record a la tabla.
    
    try
    {
      return this.db
          .collection("encuestas")
          .add(JSON.parse(JSON.stringify(encuesta)))
          .then(res => { console.log('Guardado---') })
    } catch (error)
    {
      console.error('Error: ', error);
    }

  }

  //Borrar un Encuesta de la DB
  deleteEncuesta(encuesta: Encuesta)
  {
    try
    {
      return this.db
        .collection("encuestas")
        .doc(encuesta.id)
        .delete()
        .then(res => { console.log(res) });

    } catch (error)
    {
      console.log('Error: ', error);
    }

  }

  //Editar un Encuesta
  editEncuesta(newEncuesta)
  {
    return this.db
      .collection("encuestas")
      .doc(newEncuesta.payload.doc.id)
      .set({ completed: true }, { merge: true });

  }
}
