import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ArticleResponse } from 'src/app/models/articleResponse';
import { NewArticle } from 'src/app/models/newArticle';
import { UserResponse } from 'src/app/models/userResponse';
import { ArticleService } from 'src/app/services/article.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {

  user: UserResponse;
  author: UserResponse
  frmUpdateArticle: FormGroup;
  updateArticle: NewArticle;
  articleResponse: ArticleResponse;
  isImage: boolean = false;
  file: File;
  fileMin: File;
  id: number;
  

  constructor(private userService: UserService,
              private tokenService: TokenService,
              private formBuilder: FormBuilder,
              private articleService: ArticleService,
              private route: ActivatedRoute) {

              let userName: string;
              userName = this.tokenService.getUser();
              this.getUserByUserName(userName);
              window.scroll(0,340);
              this.route.params.subscribe(p => {
                this.id = p.id;
              });
                this.getArticle(this.id);
                this.formBuilerArticleUpdate();
                
            }

  ngOnInit(): void {
    
  }

  getImage = (event) => {
    //console.log(event.target.files)
    this.isImage = true;
    this.file = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.fileMin = evento.target.result;
    };
    fr.readAsDataURL(this.file);
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
              this.tokenService.logout();
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

  
    getArticle(id: number){

      this.articleService.getArticle(id).subscribe(
        res => {
          this.articleResponse = res;
          this.author = new UserResponse(res.user.id, res.user.name, res.user.userName, res.user.email, res.user.roles,
            res.user.imageURL, res.user.imageID);
          this.frmUpdateArticle.setValue({
            title: this.articleResponse.title,
            image: null,
            content: this.articleResponse.content
          });
         
        },
        err => {}
      );
    }

    formBuilerArticleUpdate() {

      this.frmUpdateArticle = this.formBuilder.group({
        title: ['', Validators.required],
        image: [''],
        content: ['', Validators.required]
      });
    }

    goUpdateArticle(event: Event){
      event.preventDefault();
      if (this.frmUpdateArticle.valid) {
        
        const values = this.frmUpdateArticle.value;
        this.updateArticle = new NewArticle(values.title,this.author, values.content);
        let update = false;
        this.articleService.updateArticle(this.id, this.updateArticle).subscribe(
          res => {
            update = true;
            if (this.isImage) {
              
              this.articleService.addImageArticle(this.file,this.id).subscribe(
                res => {
                  update = true;
                },
                err => {
                  update = false;
                  Swal.fire({
                    icon: 'error',
                    title: `ERROR: ${err.error.message}`,
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 3000
                  });
                  return;
                }
              );
              if (update) {
                Swal.fire({
                  icon: 'success',
                  title: 'Articulo Actualizado !!',
                  showConfirmButton: false,
                  showCancelButton: false,
                  timer: 3000
                });
                window.location.href = '/';
              }
            }
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: `ERROR: ${err.error.message}`,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 3000
            });
            return;
          }
        );
      }

    }

}
