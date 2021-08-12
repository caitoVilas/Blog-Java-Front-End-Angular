import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from '../../services/article.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService]
})
export class HomeComponent implements OnInit {

  public articles: Article[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {

   

    this.articleService.getArticlesPage(0, 5, 'id', false).subscribe(
      response =>{
        //console.log(response);
        this.articles = response.content;
        console.log(this.articles)
      },
      error => {
        console.log(error);
      }
    );
  }

}
