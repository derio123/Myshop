import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private myShop: AngularFireAuth) { }

  login(user: User){
    return this.myShop.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User){
    return this.myShop.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logOut(){
    return this.myShop.auth.signOut();
  }

  getAuth(){
    return this.myShop.auth;
  }

}
