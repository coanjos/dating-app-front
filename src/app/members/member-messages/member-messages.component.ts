import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/domain/models/message';
import { UserService } from 'src/app/domain/services/user.service';
import { AuthService } from 'src/app/domain/services/auth.service';
import { AlertifyService } from 'src/app/domain/services/alertify.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];  

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,    
  ) { }

  ngOnInit(): void {
    this.loadMessages()
  }

  loadMessages() {
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
        this.alertify.error(error);
      })
  }

}
