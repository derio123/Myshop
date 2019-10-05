import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authServe: AuthService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authServe.getAuth().onAuthStateChanged(user => {
        if (user) this.router.navigate(['dashboard']);
        resolve(!user ? true : false);
      })
    })
  }
}
