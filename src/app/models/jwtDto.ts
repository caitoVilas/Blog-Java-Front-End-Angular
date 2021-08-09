
export class JwtDto{
    jwt: string;
    userName: string;
    authorities: string[];

    constructor(jwt: string, userName: string, authotities: string[]){
        this.jwt = jwt;
        this.userName = userName;
        this.authorities = authotities;
    }
}