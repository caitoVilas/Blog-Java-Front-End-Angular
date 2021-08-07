
export class NewUser{
    name: String;
    userName:String;
    email: String;
    password: String;
    roles: String[];

    constructor(name: String, userName: String, email: String, password: String, roles: String[]){
        this.name = name;
        this.userName = userName
        this.email = email;
        this.password = password;
        this.roles = roles;
    };
}