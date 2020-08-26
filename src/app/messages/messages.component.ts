import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../domain/models/pagination';
import { Message } from '../domain/models/message';
import { UserService } from '../domain/services/user.service';
import { AuthService } from '../domain/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../domain/services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    })
  }

  loadMessages() {
    this.userService.getMessages(
      this.authService.decodedToken.nameid,
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.messageContainer
    ).subscribe((res: PaginatedResult<Message[]>) => {
      this.messages = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    })
  }

  getMessage(event: any): void 
  {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
