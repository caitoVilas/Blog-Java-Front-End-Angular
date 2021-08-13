import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {debounceTime} from 'rxjs/operators'
import { JwtDto } from 'src/app/models/jwtDto';
import { LoginUser } from 'src/app/models/loginUser';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, TokenService]
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});
  loginUser: LoginUser;
  jwtDto: JwtDto;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private tokenService: TokenService) {
    this.buildFormLogin();
   }

  ngOnInit(): void {
    window.scroll(0,120);
  }

  private buildFormLogin(){
    this.formLogin = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.formLogin.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      //console.log(value)
    })
  }

  login(event: Event){
    event.preventDefault();
    if(this.formLogin.valid){
      const values = this.formLogin.value;
      this.loginUser = new LoginUser(values.userName, values.password);

      this.authService.login(this.loginUser).subscribe(
        res => {
          this.jwtDto = new JwtDto(res.jwt, res.userName, res.authorities);
          this.tokenService.setToken(this.jwtDto.jwt);
          this.tokenService.setUser(this.jwtDto.userName);
          this.tokenService.setRoles(this.jwtDto.authorities);
          Swal.fire({
            icon: 'success',
            title: 'Acceso Autorizado',
            text: `Bienvenido ${this.jwtDto.userName} !!`,
            showConfirmButton: false,
            timer: 2500
          });
          window.location.href="/";
        },
        err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'No Autorizado',
            text: 'nombre de usuario o contraseña incorrectos',
            showConfirmButton: false,
            timer: 2500
          });
        }
      );
    };
  }
 
}
