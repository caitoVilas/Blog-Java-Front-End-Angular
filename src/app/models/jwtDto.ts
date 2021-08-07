
export class JwtDto{
    jwt: String;
    userName: String;
    roles: String[];

    constructor(jwt: String, userName: String, roles: String[]){
        this.jwt = jwt;
        this.userName = userName;
        this.roles = roles;
    }
}