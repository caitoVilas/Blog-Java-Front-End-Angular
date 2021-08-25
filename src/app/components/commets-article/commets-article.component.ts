import { Component, Input, OnInit } from '@angular/core';
import { Comments } from 'src/app/models/comments';
import { CommentsService } from 'src/app/services/comments.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commets-article',
  templateUrl: './commets-article.component.html',
  styleUrls: ['./commets-article.component.css'],
  providers: [CommentsService, TokenService]
})
export class CommetsArticleComponent implements OnInit {

  @Input() id: number;

  comments : Comments[];
  commentsError: string;
  errors: boolean = false;
  page: number = 0;
  isFirst: boolean;
  isLast: boolean;
  totalPages: number;
  pgs: number[] = [];
  actualPage: number;
  isAdmin: boolean;

  constructor(private commentsService: CommentsService,
              private tokenService: TokenService) { }

  ngOnInit(): void {

    if (this.tokenService.getRoles().includes('ROLE_ADMIN')) {
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
    this.getCommentsPag(this.id, this.page);  
  }

  getCommentsPag(id: number, page: number){

    this.commentsService.getCommentsPageable(id, page).subscribe(
      res => {
        this.errors = false;
        this.comments = res.content;
        this.isFirst = res.first;
        this.isLast = res.last;
        this.totalPages = res.totalPages;
        this.actualPage = res.number;
        for(let i = 0; i < this.totalPages; i++){
          this.pgs.push(i+1);
        }
      },
      err => {
        console.log(err)
        console.log(this.errors)
        this.errors = true;
        if(err.error.status === 403){
          this.errors = true;
          this.commentsError = 'Debes authenticarte para ver los mensajes';
          console.log(this.errors)
        }else{
          this.commentsError = err.error.messaje;
        }
        console.log(this.commentsError)
      }
    );
  }

  onDelete(id: number){
    
    Swal.fire({
      title: `Eliminar Comentario`,
      text: 'Los comentarios eliminados No podran Recuperarse',
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
        this.commentsService.deleteComment(id).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Mensaje Eliminado !!',
              showConfirmButton: false,
              showCancelButton: false,
              timer: 3000
            });
            this.getCommentsPag(this.id, this.page);
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: `ERROR: ${err.error.message}`,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 3000
            });
            this.getCommentsPag(this.id, this.page);
          }
        );
      }else{
        return;
      }
    });
  };

}
