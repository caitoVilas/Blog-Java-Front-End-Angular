import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentNew } from '../models/commentNew';
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

 sendComment(comment: CommentNew): Observable<Comments>{
  let token = this.tokenService.getToken();
  let header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.httpClient.post<Comments>(this.commentURL, comment, {headers: header});
 }

 getCommentsPageable(id: number, page: number = 0, size: number = 10, order: string = 'id', asc:boolean = false): Observable<any>{

  let token = this.tokenService.getToken();
  let header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.httpClient.get<any>(this.commentURL + `/pageable/${id}?page=${page}&size=${size}&order=${order}&asc=${asc}`, {headers: header});
 }

 deleteComment(id: number): Observable<any>{

  let token = this.tokenService.getToken();
  let header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.httpClient.delete<any>(this.commentURL + `/${id}`, {headers: header});
 }
}
