import { UserResponse } from "./userResponse";

export class NewArticle {

    title: string;
    user: UserResponse;
    content: string;

    constructor(title: string, user: UserResponse, content: string){

        this.title = title;
        this.user = user;
        this.content = content;
    }
}