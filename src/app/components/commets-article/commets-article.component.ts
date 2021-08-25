import { Component, Input, OnInit } from '@angular/core';
import { Comments } from 'src/app/models/comments';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-commets-article',
  templateUrl: './commets-article.component.html',
  styleUrls: ['./commets-article.component.css'],
  providers: [CommentsService]
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

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
  
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

}
