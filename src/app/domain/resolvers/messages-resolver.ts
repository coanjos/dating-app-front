import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../models/message';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService,
        private authService: AuthService
    ) { }
    
    resolve(route: ActivatedRouteSnapshot) : Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid,
                this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving messages');
                this.router.navigateByUrl('/home');
                return of(null);
            })
        )
    }
}
