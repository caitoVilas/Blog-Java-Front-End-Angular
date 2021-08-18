
export class CommentNew{

    user_id: number;
    article_id: number;
    content: string;

    constructor(user_id: number, article_id: number, content: string){

        this.user_id = user_id;
        this.article_id = article_id;
        this.content = content;
    }
}
