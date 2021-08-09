
export class User {

     id: number;
     name: String;
     userName: String;
     email: String;
     password: String;
     roles: String[];
     imageURL: String;
     imageID: String;

    constructor(id: number, name: String, userName: String, email: String, password: String, roles: String[],
        imageURL: String, imageID: String){

            this.id = id;
            this.name = name;
            this.userName = userName;
            this.email = email;
            this.password = password;
            this.roles = roles;
            this.imageURL = imageURL;
            this.imageID = imageID;
        }
}