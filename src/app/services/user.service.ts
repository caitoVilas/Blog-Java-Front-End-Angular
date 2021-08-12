import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from '../models/newUser';
import { UserResponse } from '../models/userResponse';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL = 'http://localhost:8080/api/v1/users';

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) { }

  public register(newUser: NewUser): Observable<any>{

    return this.httpClient.post<any>(this.userURL + '/create', newUser);
  }

  public getByUsername(userName: string): Observable<UserResponse> {

    let token = this.tokenService.getToken();
    let header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<UserResponse>(this.userURL + `/user/${userName}`, {headers: header});
  }
}
