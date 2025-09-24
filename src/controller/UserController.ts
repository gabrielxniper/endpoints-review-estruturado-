import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'; 

export class UserController {
    private userBusiness = new UserBusiness();
    public getUserById = (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const user = this.userBusiness.getUserById(id);

            res.status(200).json(user);
        }
        catch (error: any) {
            
            res.status(400).json("Usuário não encontrado");
        }
    }
    public getUsersByAgeRange = (req: Request, res: Response) =>{
        try {
            const { min, max } = req.query;
            const users = this.userBusiness.getUsersByAgeRange(min, max);

            res.status(200).json(users);
        }catch (error: any){
            res.status(400).send({ message: error.message });
        }
    }
    public putUserById = (req:Request, res: Response) =>{
        try{
            const id = req.params.id;
            const{ name, email, role, age} = req.body;
            const updateUser = this.userBusiness.putUserById( id, name, email, role, age);
            res.status(200).send({ message: "Utilizador atualizado com sucesso!", user: updateUser });
        }catch (error: any){
            res.status(400).send({ message: error.message });
        }
    }
    public cleanupInactiveUsers = (req: Request, res: Response) => {
        try {
            const { confirm } = req.query;
            const removedUsers = this.userBusiness.cleanupInactiveUsers(confirm);
            res.status(200).send({
                message: "Limpeza de utilizadores inativos concluída.",
                removedUsers: removedUsers
            });
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    }
}

