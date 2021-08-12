import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleResponse } from '../models/articleResponse';
import { NewArticle } from '../models/newArticle';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articleURL = 'http://localhost:8080/api/v1/articles';

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) {};

  getArticlesPage(page: number =0, size: number = 10, order: String ='id', asc: boolean = false): Observable<any>{

    return this.httpClient.get(this.articleURL + `/pageable?page=${page}&size=${size}&order=${order}&asc=${asc}`);

  }
 
  createArticle(newArticle: NewArticle): Observable<ArticleResponse>{

    let token = this.tokenService.getToken();
    let header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post<ArticleResponse>(this.articleURL, newArticle, {headers: header});
  }

  addImageArticle(image: File, id: number): Observable<ArticleResponse>{

    let token = this.tokenService.getToken();
    let header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    formData.append('file', image);
    formData.append('id', id.toString());

    return this.httpClient.post<ArticleResponse>(this.articleURL + '/up-image', formData, {headers: header});
  }

}