
export class UserResponse {

    id: number;
    name: string;
    userName: string;
    email: string;
    roles: string[];
    imageURL: string;
    imageID: string;

    constructor(id: number, name: string, userName: string, email: string, roles: string[], imageURL:string, imageID: string){
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.email = email;
        this.roles = roles;
        this.imageURL = imageURL;
        this.imageID = imageID;
    }
}