import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLinkActive} from '@angular/router'
import { debounceTime } from 'rxjs/operators';
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

  goUpdate(id: number){
    this.router.navigate(['article-update/', id])
  }

  deleteArticle(id: number, title: string) {
    console.log('entro a eliminar')
    Swal.fire({
      title: `Eliminar Articulo ${title}`,
      text: 'Los Articulos eliminados No podran Recuperarse',
      icon: 'question',
      showCloseButton: false,
      showCancelButton: true,
      confirmButtonColor: 'green',
      confirmButtonText: `<i class="far fa-thumbs-up"></i>`,
      confirmButtonAriaLabel: 'ok',
      cancelButtonColor: 'red',
      cancelButtonText: `<i class="far fa-thumbs-down"></i>`,
      cancelButtonAriaLabel: 'no'
    }).then((result) => {
      if(result.isConfirmed){
        this.articleService.deleteArticle(id).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Articulo Elminado !!',
              showCancelButton: false,
              showConfirmButton: false,
              timer: 3000
            });
            this.router.navigate(['/']);
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: `ERROR: ${err.error.message}`,
              showConfirmButton: false,
              showCancelButton: false,
              timer: 3000
            });
            return;
          }
        );
      }else{
        return;
      }
    });
  }

}
