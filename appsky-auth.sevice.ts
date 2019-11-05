import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppskyAuthService {
  auth = firebase.auth();
  storeLocal = true;
  user: firebase.User;

  constructor(private router: Router) {
    if (this.storeLocal) {
      this.getLocalUser();
    }
  }

  getLocalUser() {
    this.user = JSON.parse(localStorage.getItem('User'))
  }

  saveUser(user: firebase.User) {
    localStorage.setItem('User', JSON.stringify(user));
  }

  clearLocalUser() {
    this.user = undefined;
    localStorage.clear();
  }

  setUser(user: firebase.User) {
    this.user = user;
    if (this.storeLocal) {
      this.saveUser(user);
    }
  }

  get isAuthenticated() {
    return this.user !== undefined;
  }

  get uid() {
    if (this.user) {
      return this.user.uid;
    }
    return null;
  }

  googleLogin(): Promise<firebase.User> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return new Promise<firebase.User>((resolve, reject) => {
      firebase.auth().signInWithPopup(provider).then((result) => {
        // The signed-in user info.
        this.setUser(result.user);
        resolve(result.user);

      }).catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage);

        // The email of the user's account used.
        // const email = error.email;
      });
    });
  }

  facebookLogin(): Promise<firebase.User> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return new Promise<firebase.User>((resolve, reject) => {
      firebase.auth().signInWithPopup(provider).then((result) => {
        // The signed-in user info.
        this.setUser(result.user);
        resolve(result.user);

      }).catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage);

        // The email of the user's account used.
        // const email = error.email;
      });
    });
  }

  logout() {
    this.auth.signOut();
    this.clearLocalUser();
    this.router.navigate(['users/login']);
  }

}
