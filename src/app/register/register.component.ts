import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../domain/services/auth.service';
import { AlertifyService } from '../domain/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registration Successful');
      this.router.navigateByUrl('/home');
    }, error => {
      this.alertify.error('Something went wrong');
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
