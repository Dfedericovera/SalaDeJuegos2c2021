import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interface/user.interface';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  public user: User = null;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private afs: AngularFirestore
  )
  {
/*     this.afAuth.authState.subscribe((user) =>
    {
      this.user = user;
      console.log(user);
    }); */
    this.afAuth.authState.subscribe(user=>{
      this.user = user;
    })
  }

  async login(email: string, password: string)
  {
    try
    {
      var result = await this.afAuth.signInWithEmailAndPassword(email, password);
      localStorage.setItem("user",JSON.stringify(result.user.email));
      this.guardarFechaDeIngreso(result.user);
      return result;
    } catch (error)
    {
      console.error("login", error);
      throw error;
    }
  }

  guardarFechaDeIngreso(user:User){
    let fecha = new Date();
    this.afs.collection('/ingresos', (ref) =>
      ref.orderBy('date')
    ).add({usuario: user.email,fechaDeIngreso: fecha.toLocaleString()});
  }

  async loginAnonymously()
  {
    try
    {
      var result = await this.afAuth.signInAnonymously();
      return result;
    } catch (error)
    {
      console.error("login", error);
      throw error;
    }
  }

  async register(email: string, password: string)
  {
    try
    {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      )
      return user;
    } catch (error)
    {
      console.error("Register error", error);
      throw error;
    }
  }

  isEmailVerified(user: User): Boolean
  {
    console.log(user);
    if(user.email == 'medico@valderrama.com'||"medico2@delaolla.com" || "paciente@gonzales.com"){
      return true;
    }
    return user.emailVerified === true ? true : false;
  }

  async sendPasswordResetEmail(passwordResetEmail: string)
  {
    try
    {
      return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
    } catch (error)
    {
      console.error("sendPasswordResetEmail", error);
    }
  }

  async logout()
  {
    try
    {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
    } catch (error)
    {
      console.error("logout", error);
    }

  }

  get isLoggedIn(): boolean
  {
    try
    {
      const user = JSON.parse(localStorage.getItem('user'));
      return user !== null;
    } catch (error)
    {
      console.error("isLoggedIn", error);
    }
  }

  getUserAuth(){
    return this.afAuth.authState
  }

}
