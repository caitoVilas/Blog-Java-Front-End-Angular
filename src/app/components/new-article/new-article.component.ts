import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ArticleResponse } from 'src/app/models/articleResponse';
import { NewArticle } from 'src/app/models/newArticle';
import { UserResponse } from 'src/app/models/userResponse';
import { ArticleService } from 'src/app/services/article.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css'],
  providers: [UserService, TokenService, ArticleService]
})
export class NewArticleComponent implements OnInit {

  user: UserResponse;
  frmNewArticle: FormGroup;
  newArticle: NewArticle;
  articleResponse: ArticleResponse;
  isImage: boolean;

  constructor(private userService: UserService,
              private tokenService: TokenService,
              private formBuilder: FormBuilder,
              private articleService: ArticleService) { 

        this.builderFormNewarticle();
  }

  ngOnInit(): void {

    let userName: string;
    userName =  this.tokenService.getUser();
    this.getUserByUserName(userName);
  }

  getUserByUserName(userName: string){

    this.userService.getByUsername(userName).subscribe(
      res => {
        this.user = new UserResponse(res.id, res.name, res.userName, res.email, res.roles, res.imageURL, res.imageID);
      },
      err => {
        if (!this.user) {
          Swal.fire({
            icon: 'error',
            title: 'Error No Autorizado',
            text: 'Debes Autenticarte para crear Articulos',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Ingresar',
            cancelButtonText: 'Salir'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = 'login'; 
            }else{
              window.location.href = '/';
            }
          });
        }else {
          Swal.fire({
          icon: 'error',
          title: 'ERROR: error con la coneccion al servidor',
          text: 'Intente mas tarde',
          showConfirmButton: true,
          confirmButtonColor: 'green',
          confirmButtonText: 'Salir'
        }).then((result) =>{
          if (result.isConfirmed) {
            window.location.href = '/';
          }
        });
        }
        
      }
    );
  }

  builderFormNewarticle(){
    
    this.frmNewArticle = this.formBuilder.group({
      title: ['', Validators.required],
      image: [''],
      content: ['', Validators.required]
    });
    this.frmNewArticle.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      //console.log(value)
    });
  }

  createArticle(event: Event) {
    event.preventDefault();
    if (this.frmNewArticle.valid) {
      const values = this.frmNewArticle.value;
      this.newArticle = new NewArticle(values.title, this.user, values.content);
      if (!values.image) {
        this.isImage = false;
      }else{
        this.isImage = true;
      }
      
      this.articleService.createArticle(this.newArticle).subscribe(
        res => { 
          this.articleResponse = new ArticleResponse(res.id, res.title, res.user, res.content, res.imageURL,
            res.imageID, res.created);
          
          if (this.isImage) {
            let imageParameter = values.image;
            let idParameter = this.articleResponse.id;
            
            this.articleService.addImageArticle(imageParameter, idParameter).subscribe(
              res => {
                console.log(res)
              },
              err => {
                console.log(err)
                Swal.fire({
                  icon: 'error',
                  title: `ERROR: ${err.message}`,
                  showCancelButton: false,
                  timer: 3000
                });
              }
            );
          }
          this.builderFormNewarticle();
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: `ERROR: ${err.message}`,
            showCancelButton: false,
            timer: 3000
          });
        }
      );
    } 
  }
}
