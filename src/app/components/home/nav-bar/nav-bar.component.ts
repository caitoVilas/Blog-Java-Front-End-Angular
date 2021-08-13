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
  isAdmin: boolean;
  userName: string;
  roles: String[];

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {

    if(!this.tokenService.getToken()){
      this.isLogged = false;
    }else{
      this.isLogged = true;
    }

    this.userName = this.tokenService.getUser()
    this.roles = this.tokenService.getRoles()
    
    if(this.roles.includes('ROLE_ADMIN')){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }


    console.log(this.roles)
    console.log(`admin: ${this.isAdmin}`)
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
