import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }
  
  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('Unauthorized!');
    this.router.navigateByUrl('/home');
    return false;
  }  
}
