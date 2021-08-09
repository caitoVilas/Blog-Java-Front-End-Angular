import { User } from "./user";

export class Article {

     id: number;
     title: String;
     content: String;
     user: User;
     created: any;
     imageURL: String;
     imageID: String;

    constructor(id: number, title: String, content: String, user: User, created: any, imageURL: String, imageID: String){

        this.id = id;
        this.title = title;
        this.content = content;
        this.user = user;
        this.created = created;
        this.imageURL = imageURL;
        this.imageID = imageID;
    }
}