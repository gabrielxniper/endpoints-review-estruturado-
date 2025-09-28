import { UserData } from "../data/UserData";
import { PostData } from "../data/PostData";
import { Post } from "../types/post";

export class PostBusiness {
    private userData = new UserData();
    private postData = new PostData();

    postCreate = (title: string, content: string, authorId: number) : Post => {
        const errors: string[] = [];
        if (!title) {
            errors.push("O campo 'title' é obrigatório."); 
        }
        if (!content) {
            errors.push("O campo 'content' é obrigatório."); 
        }
        if (!authorId) { 
            errors.push("O campo 'authorId' é obrigatório."); 
        }
        if (typeof title !== 'string' || title.length < 3) { 
            errors.push("O título deve ser um texto com pelo menos 3 caracteres."); 
        }
        if (typeof content !== 'string' || content.length < 10) {
            errors.push("O conteúdo deve ser um texto com pelo menos 10 caracteres."); 
        }
        if (typeof authorId !== 'number') { 
            errors.push("O campo 'authorId' deve ser um número."); 
        }  
        if (errors.length > 0) {
             throw new Error(errors.join("\n"));
        }
        
        const authorExists = this.userData.searchUserById(authorId);
        if (!authorExists) {
            throw new Error(`Autor com id ${authorId} não foi encontrado.`);
        }
        
        const newPost: Post = {
            id: this.postData.getNextId(),
            title: title,
            content: content,
            authorId: authorId,
            createdAt: new Date(),
            published: false,
        }
        
        this.postData.createPost(newPost);
        return newPost;
    }
    postUpdate = (id: any, dataToUpdate: any) => {
        const IdNumber = Number(id);
        const postToUpdate = this.postData.searchPostById(id);
        const forbiddenKeys = ['id', 'authorId', 'createdAt'];
        const errors: string[] = [];

        if(isNaN(IdNumber)){
            errors.push("ID do post inválido, deve ser um número.");
        }
        if(!postToUpdate){
            errors.push("Post não encontrado");
        }

        for (let i = 0; i < forbiddenKeys.length; i++) {
            const key = forbiddenKeys[i];
            if (key in dataToUpdate) {
                errors.push(`Não é permitido alterar o campo '${key}'.`);
            }
        }
        if (errors.length > 0) {
            errors.push(errors.join("\n"));//join quebra os textos do "errors"
        }

        if (errors.length > 0) {
            throw new Error(errors.join("\n"));
       }
        const updatedPost = this.postData.updatePost(id, dataToUpdate);
        return updatedPost;
    }
    public deletePost = (postId: string, userId: string) => {
        const postIdNumber = Number(postId);
        const userIdNumber = Number(userId);

        const errors: string[] = [];
        if (isNaN(postIdNumber)) { errors.push("ID do post inválido, deve ser um número."); }
        if (isNaN(userIdNumber)) { errors.push("Header 'User-Id' é obrigatório e deve ser um número."); }

        if (errors.length > 0) { 
            throw new Error(errors.join("\n")); 
        }

        const postToDelete = this.postData.searchPostById(postIdNumber);
        if (!postToDelete) { 
            throw new Error("Post não encontrado."); 
        }

        const userRequesting = this.userData.searchUserById(userIdNumber);
        if (!userRequesting) { 
            throw new Error("Utilizador da requisição não encontrado."); 
        }

        if (postToDelete.authorId !== userIdNumber && userRequesting.role !== 'admin') {
            throw new Error("Ação não autorizada. Apenas o autor ou um admin pode apagar este post.");
        }

        this.postData.deletePostById(postIdNumber);
    }
}