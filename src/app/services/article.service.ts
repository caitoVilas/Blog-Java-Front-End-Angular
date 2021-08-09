import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articleURL = 'http://localhost:8080/api/v1/articles';

  constructor(private httpClient: HttpClient) {};

  getArticlesPage(page: number =0, size: number = 10, order: String ='id', asc: boolean = false): Observable<any>{

    return this.httpClient.get(this.articleURL + '/pageable');

  }

}