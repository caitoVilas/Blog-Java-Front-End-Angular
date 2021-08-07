import { Injectable } from '@angular/core';

const TOKEN_KEY = "AuthToken";
const USER_KEY = "AuthUser";
const ROLES_KEY = "AuthRoles";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<String> = [];

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  };

  public getToken(): string | null{
    return window.sessionStorage.getItem(TOKEN_KEY);
  };

  public setUser(userName: string): void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, userName);
  };

  public getUser(): string | null {
    return window.sessionStorage.getItem(USER_KEY);
  };

  public setRoles(roles: string[]): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(roles));
  };

  public getRoles(): String[] {
    this.roles = [];
    if(sessionStorage.getItem(TOKEN_KEY)){
     JSON.parse(window.sessionStorage.getItem(TOKEN_KEY)).forEach(auth => {
       this.roles.push(auth.roles) });
    }
    return this.roles;
  };

  public logout(): void{
    window.sessionStorage.clear();
  }
}
