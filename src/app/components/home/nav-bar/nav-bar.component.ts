import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [TokenService]
})
export class NavBarComponent implements OnInit {

  isLogged: boolean;
  userName: string;
  roles: String[];

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {

    console.log(this.tokenService.getToken())
    if(!this.tokenService.getToken()){
      this.isLogged = false;
    }else{
      this.isLogged = true;
    }

    console.log(this.isLogged)
    this.userName = this.tokenService.getUser()
    this.roles = this.tokenService.getRoles()
    console.log(this.userName)
    console.log(this.roles)
  }

  public handleLogout(){
    Swal.fire({
      icon: 'info',
      title: 'Cerrar Session',
      text: `Hasta pronto ${this.userName} !!`,
      showConfirmButton: false,
      timer: 3000
    });
    this.tokenService.logout();
    window.location.href="/";
  }

}
