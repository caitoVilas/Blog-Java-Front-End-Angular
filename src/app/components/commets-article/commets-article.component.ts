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

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
  
    this.getComments(this.id);  
  }

  getComments(id: number){

    this.commentsService.getComments(id).subscribe(
      res => {
        this.errors = false;
        this.comments = res;
        console.log(this.comments)
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
