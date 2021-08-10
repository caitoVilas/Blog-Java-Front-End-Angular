import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUserMessage } from '../models/newUserMessage';
import { UserMessageResponse } from '../models/userMessageResponse';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserMessagesService {

  messageURL = 'http://localhost:8080/api/v1/user-messages';


  constructor(private httClient: HttpClient,
              private tokenService: TokenService) { }

  sendMessage(newUserMessage: NewUserMessage): Observable<UserMessageResponse>{

    return this.httClient.post<UserMessageResponse>(this.messageURL + '/create', newUserMessage);
  }

  viewAll(page: number = 0, size: number = 0, order: string = "id", asc: boolean = false): Observable<any>{

    let token = this.tokenService.getToken();

    let header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let header2 = new HttpHeaders().set('content-type','application/json');

    return this.httClient.get<any>(this.messageURL +`?page=${page}`, {headers: header});
  }
}
