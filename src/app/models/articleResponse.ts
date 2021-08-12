import { UserResponse } from "./userResponse";

export class ArticleResponse{

    id: number;
    title: string;
    user: UserResponse;
    content: string;
    imageURL: string;
    imageID: string;
    created: any;

    constructor(id: number, title: string, user: UserResponse, content: string, imageURL: string,
        imageID: string, created: any){

            this.id = id;
            this.title = title;
            this.user = user;
            this.content = content;
            this.imageURL = imageURL;
            this.imageID = imageID;
            this.created = created;
        }
}