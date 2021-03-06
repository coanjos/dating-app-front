import { Component, OnInit } from '@angular/core';
import { AuthService } from '../domain/services/auth.service';
import { AlertifyService } from '../domain/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Successfully logged in');
      this.router.navigateByUrl('/members');
    }, error => {
      this.alertify.error('User or password incorrect');
    })
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged out');
    this.router.navigateByUrl('/home');
  }

}
