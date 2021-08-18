import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ArticleResponse } from 'src/app/models/articleResponse';
import { CommentNew } from 'src/app/models/commentNew';
import { ArticleService } from 'src/app/services/article.service';
import { CommentsService } from 'src/app/services/comments.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css'],
  providers: [ArticleService, TokenService, UserService, CommentsService]
})
export class NewCommentComponent implements OnInit {

  id: number;
  article: ArticleResponse;
  user_id: number;
  frmComment: FormGroup;
  commentNew: CommentNew;
  userName: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService,
              private tokenService: TokenService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private commentService: CommentsService) {

                this.buildFrmComment();
              }
              
  ngOnInit(): void {
    window.scroll(0,300);
    this.route.params.subscribe((p: Params) => {
      this.id = p.id;
    });
    this.userName = this.tokenService.getUser()
    this.getArticle(this.id);
    this.getUser(this.userName);
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

  getUser(userName: string){

    this.userService.getByUsername(userName).subscribe(
      res => {
          this.user_id = res.id
      },
      err => {
        console.log(err)
      }
    );
  }

  buildFrmComment(){
    this.frmComment = this.formBuilder.group({
      comment: ['', Validators.required]
    });
    this.frmComment.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      //console.log(value)
    });
  }

  sendComment(event: Event){
    event.preventDefault();
    if (this.frmComment.valid) {
      const values = this.frmComment.value;
      this.commentNew = new CommentNew(this.user_id, this.id, values.comment);

      this.commentService.sendComment(this.commentNew).subscribe(
        res => {
          Swal.fire({
            icon: 'success',
            title: 'Comentario Enviado',
            showCancelButton: false,
            timer: 3000
          });
          this.router.navigate(["article-detail/", this.id]);
        },
        err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: `ERROR : ${err.error.message}`,
            showCancelButton: false,
            timer: 3000
          });
        }
      );
    }
  }

  goReturn(event: Event){
    this.router.navigate(['article-detail/', this.id]);
  }
}
