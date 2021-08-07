import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { LoginUser } from '../models/loginUser';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwtDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   authURL: String = "http://localhost:8080/api/v1/auth";

  constructor(private httpClient: HttpClient) { }

  public login(loginUser: LoginUser): Observable<JwtDto>{

    return this.httpClient.post<JwtDto>(this.authURL + '/login', loginUser);
  }

}
