import { Request, Response } from 'express'
import { PostBusiness } from '../business/PostBusiness'; 

export class PostController { 
    private postBusiness = new PostBusiness()
    public postValidations = (req: Request, res: Response) =>{
        try {
        
            const { title, content, authorId } = req.body;

            const newPost = this.postBusiness.postCreate(title, content, authorId);

            res.status(201).send({ message: "Post criado com sucesso!", post: newPost });

        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }
    public updatePost = (req: Request, res: Response) =>{
        try{
            const idNumber = req.params.id;
            const dataToUpdate = req.body;
            const updatedPost = this.postBusiness.postUpdate(idNumber, dataToUpdate);
            res.status(201).send({ message: "Post atualizado com sucesso!", post: updatedPost });
        }catch(error: any){
            res.status(400).send({ message: error.message });
        }
    }
    public deletePost = (req: Request, res: Response) => {
        try {
            const postId = req.params.id;
            const userId = req.headers['user-id'] as string;
            this.postBusiness.deletePost(postId, userId);
            res.status(200).send({ message: "Post apagado com sucesso." });
        } catch (error: any) {
            if (error.message.includes("não encontrado")) {
                res.status(404).send({ message: error.message });
            } else if (error.message.includes("não autorizada")) {
                res.status(403).send({ message: error.message });
            } else {
                res.status(400).send({ message: error.message });
            }
        }
    }
}