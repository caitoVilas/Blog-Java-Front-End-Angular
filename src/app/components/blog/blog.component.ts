import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService]
})
export class BlogComponent implements OnInit {

  page: number = 0;
  isFirst: boolean;
  isLast: boolean;
  totalPages: number;
  pgs: number[] = [];
  actualPage: number;

  public articles: Article[] = [];

  constructor(private articleService: ArticleService,
              private router: Router) { }

  ngOnInit(): void {

    this.getArticles(this.page);
  }

  getArticles(page: number){
    this.pgs = [];
    window.scroll(0,340);
    this.articleService.getArticlesPage(page).subscribe(
      resp => {
        this.articles = resp.content;
        this.isFirst = resp.first;
        this.isLast = resp.last;
        this.totalPages = resp.totalPages;
        this.actualPage = resp.number;
        for(let i = 0; i < this.totalPages; i++){
          this.pgs.push(i + 1);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  goDetails(id: number){
    this.router.navigate(["article-detail/", id])
  }

}
