
export class NewUser{
    name: string;
    userName:string;
    email: string;
    password: string;
    roles: string;

    constructor(name: string, userName: string, email: string, password: string, roles: string){
        this.name = name;
        this.userName = userName
        this.email = email;
        this.password = password;
        this.roles = roles;
    };
}