import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLinkActive} from '@angular/router'
import { ArticleResponse } from 'src/app/models/articleResponse';
import { ArticleService } from 'src/app/services/article.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
  providers: [ArticleService, TokenService]
})
export class ArticleDetailComponent implements OnInit {

  id: number;
  article: ArticleResponse;
  isLogged: boolean;
  isAdmin: boolean;
  authorOrAdmin: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.route.params.subscribe((p: Params) => {
      this.id = p.id;
    });
    this.getArticle(this.id);
    window.scroll(0,300);
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }

    if (this.tokenService.getRoles().includes('ROLE_ADMIN')) {
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }

  getArticle(id: number){

    this.articleService.getArticle(id).subscribe(
      res => {
        this.article = res;
        if (!this.isAdmin) {
          if (this.article.user.userName === this.tokenService.getUser()) {
            this.authorOrAdmin = true;
          }else{
            this.authorOrAdmin = false;
          }
        }else{
          this.authorOrAdmin = true;
        }
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

  goNewComment(id: number){
    this.router.navigate(["article-comment/", id]);
  }

}
