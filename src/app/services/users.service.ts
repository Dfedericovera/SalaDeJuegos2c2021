import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../clases/Usuario';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileI } from '../interface/file';
@Injectable({
  providedIn: 'root'
})
export class UserService
{
  //Este contendra una Coleccion de users de la DB.
  private usersDB: AngularFirestoreCollection<User>;
  public users: Array<User>;
  private filePath: any;
  private downloadURL: Observable<string>;
  public jugador:User;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  )
  {
    this.getUsers().subscribe(users =>
    {
      this.users = users;
      var jug = JSON.parse(localStorage.getItem('user')) as User;
      users.forEach(jugador =>
      {

        if (jugador.email == jug.email)
        {
          this.jugador = jugador;
        }

      })
    })
    //? Accedemos a la base de datos de firebase.
    //? Vamos a acceder la lista de users en la db.
    //? y se implementa la funcionalidad en el segundo argumento.
    //? La referencia que es nuestra lista de users, se va a ordenar por nombre.
    this.usersDB = this.db.collection('/jugadores', (ref) =>
    ref.orderBy('date')
  );
  }

//Devuelve un Observable de tipo User Array.
getUsers(): Observable < User[] >
{
  return this.db.collection("users", (ref) =>
    ref.orderBy('date')).snapshotChanges().pipe(
      map((snaps) =>
        snaps.map((snap) =>
        {
          return snap.payload.doc.data() as User;
        }))
    )
}

createUser(user: User, photos: Array<FileI>)
  {
    return this.addUser(user).then(userCallback =>
    {
      console.log('User created');
      photos.forEach(photo =>
      {
        this.uploadImage(user, photo);
      })
      return userCallback;
    })

  }

  //Metodo para crear un nuevo User en la DB
  private addUser(user: User)
  {
    //?Con esto FireBase se encarga de todo,
    //?no hay que pensar en endpoints o si esta o no creada la tabla.
    //?Adicionamos un nuevo paciente a la tabla.
    return new Promise<User>((resolve, reject) =>
    {
      this.usersDB
        .add(JSON.parse(JSON.stringify(user)))
        .then(res =>
        {
          user.id = res.id;
          this.editUser(user);
          resolve(user);
        }, err => reject(console.error(err)));
    });

  }

  //Delete a User de la DB
  deleteUser(user: User)
  {
    try
    {
      return this.db
        .collection("jugadores")
        .doc(user.id)
        .delete()
        .then(res => { console.log(res) });

    } catch(error)
    {
      console.log('Error: ', error);
    }

  }

  //Edit a User
  editUser(newUser)
  {
    return this.db
      .collection("jugadores")
      .doc(newUser.id)
      .set(newUser, { merge: true });

  }

  private uploadImage(user: User, image: FileI)
  {
    this.filePath = `jugadores/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() =>
        {
          fileRef.getDownloadURL().subscribe(urlImage =>
          {
            this.downloadURL = urlImage;
            user.photos = new Array;
            user.photos.push(this.downloadURL);
            /* console.log('URL_image', urlImage); */
            this.editUser(user).then(() => console.log('Updated photo'));
          });
        })
      ).subscribe();
  }
}
