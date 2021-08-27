import { Component, OnInit } from '@angular/core';
import { ArticleResponse } from 'src/app/models/articleResponse';

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.component.html',
  styleUrls: ['./search-article.component.css']
})
export class SearchArticleComponent implements OnInit {

  articles: ArticleResponse[] = [];

  constructor() { }

  ngOnInit(): void {
    window.scroll(0,300);
  }

  goHome(){
    window.location.href = '/';
  }

}
