
export class UserMessageResponse{

    id: number;
    email: string;
    message: string;
    created: any;

    constructor(id: number, email: string, message: string, created: any){

        this.id = id;
        this.email = email;
        this.message = message;
        this.created = created;
    }
}