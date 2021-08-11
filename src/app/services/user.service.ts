import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from '../models/newUser';
import { UserResponse } from '../models/userResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL = 'http://localhost:8080/api/v1/users';

  constructor(private httpClient: HttpClient) { }

  public register(newUser: NewUser): Observable<any>{

    return this.httpClient.post<any>(this.userURL + '/create', newUser);
  }
}
