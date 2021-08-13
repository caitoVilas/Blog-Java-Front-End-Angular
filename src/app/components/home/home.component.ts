import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private articleService: ArticleService,
              private router: Router) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.articleService.getArticlesPage(0, 5, 'id', false).subscribe(
      response =>{
        //console.log(response);
        this.articles = response.content;
      },
      error => {
        console.log(error);
      }
    );
  }

  goDetails(id: number){
    this.router.navigate(["article-detail/", id])
  }

}
