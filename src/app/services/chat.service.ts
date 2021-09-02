import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { PostI } from '../interface/post';

@Injectable({
  providedIn: 'root'
})
export class ChatService
{


  //Este contendra una Coleccion de posts de la DB.
  private postsDB: AngularFirestoreCollection<PostI>;
  public posts: Array<PostI>;
  private filePath: any;
  private downloadURL: Observable<string>;


  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  )
  {
    this.getPosts().subscribe(posts =>
    {
      this.posts = posts;
      console.log("Service", this.posts);
    })
    //? Accedemos a la base de datos de firebase.
    //? Vamos a acceder la lista de posts en la db.
    //? y se implementa la funcionalidad en el segundo argumento.
    //? La referencia que es nuestra lista de posts, se va a ordenar por nombre.
    this.postsDB = this.db.collection('/posts', (ref) =>
      ref.orderBy('date')
    );
  }

  //Devuelve un Observable de tipo Post Array.
  getPosts(): Observable<any>
  {
/*     return this.db.collection("posts", (ref) =>
      ref.orderBy('date')).snapshotChanges().pipe(
        map((snaps) =>
          snaps.map((snap) =>
          { */
            /*  const data = snap.payload.doc.data() as Post;
             const id = snap.payload.doc.id;
             return { id, data } */
     /*        console.log(snap.payload.doc.data());
            return snap.payload.doc.data() as PostI
          }))
      ) */
      return this.db.collection("posts",(ref) =>
      ref.orderBy('timestamp')).snapshotChanges().pipe(
        map((snaps) =>
          snaps.map((snap) =>
          {
            return snap.payload.doc.data() as PostI;
          }))
      )
  }

  createPost(post: PostI)
  {
    return this.addPost(post).then(postCallback =>
    {
      console.log('Post created');
      return postCallback;
    })

  }

  //Metodo para crear un nuevo Post en la DB
  private addPost(post: PostI)
  {
    //?Con esto FireBase se encarga de todo,
    //?no hay que pensar en endpoints o si esta o no creada la tabla.
    //?Adicionamos un nuevo paciente a la tabla.
    return new Promise<PostI>((resolve, reject) =>
    {
      this.postsDB
        .add(JSON.parse(JSON.stringify(post)))
        .then(res =>
        {
          post.id = res.id;
          this.editPost(post);
          resolve(post);
        }, err => reject(console.error(err)));
    });

  }

  //Delete a Post de la DB
  deletePost(post: PostI)
  {
    try
    {
      return this.db
        .collection("posts")
        .doc(post.id)
        .delete()
        .then(res => { console.log(res) });

    } catch (error)
    {
      console.log('Error: ', error);
    }

  }

  //Edit a Post
  editPost(newPost)
  {
    return this.db
      .collection("posts")
      .doc(newPost.id)
      .set(newPost, { merge: true });

  }
}
