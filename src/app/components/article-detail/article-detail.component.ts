import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'
import { ArticleResponse } from 'src/app/models/articleResponse';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
  providers: [ArticleService]
})
export class ArticleDetailComponent implements OnInit {

  id: number;
  article: ArticleResponse;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService) { }

  ngOnInit(): void {
    this.route.params.subscribe((p: Params) => {
      this.id = p.id;
      console.log(this.id)
    });
    this.getArticle(this.id);
    window.scroll(0,300);
  }

  getArticle(id: number){

    this.articleService.getArticle(id).subscribe(
      res => {
        this.article = res;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: `${err.message}`,
          showCancelButton: false,
          timer: 3000
        });
        window.location.href = "/";
      }
    );
  }

}
