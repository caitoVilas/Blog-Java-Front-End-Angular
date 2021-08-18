import { UserResponse } from "./userResponse";

export class Comments {

    id: number;
    content: string;
    user: UserResponse;

    constructor(id: number, content: string, user: UserResponse){

        this.id = id;
        this.content = content;
        this.user = user;
    }
}