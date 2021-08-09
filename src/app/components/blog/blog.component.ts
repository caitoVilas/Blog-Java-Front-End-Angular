import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService]
})
export class BlogComponent implements OnInit {

  public articles: Article[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {

    this.articleService.getArticlesPage().subscribe(
      resp => {
        this.articles = resp.content;
      },
      err => {
        console.log(err);
      }
    );
  }

}
