import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUserMessage } from '../models/newUserMessage';
import { UserMessageResponse } from '../models/userMessageResponse';

@Injectable({
  providedIn: 'root'
})
export class UserMessagesService {

  messageURL = 'http://localhost:8080/api/v1/user-messages';

  constructor(private httClient: HttpClient) { }

  sendMessage(newUserMessage: NewUserMessage): Observable<UserMessageResponse>{

    return this.httClient.post<UserMessageResponse>(this.messageURL + '/create', newUserMessage);
  }
}
