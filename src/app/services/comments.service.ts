import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../models/comments';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  commentURL = 'http://localhost:8080/api/v1/comment';

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) { }

 getComments(id: number): Observable<Comments[]>{

  let token = this.tokenService.getToken();
  let header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.httpClient.get<Comments[]>(this.commentURL + `/all/${id}`, {headers: header});
 }
}
