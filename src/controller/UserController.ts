import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'; 

export class UserController {
    private userBusiness = new UserBusiness();
    public createUser = (req: Request, res:Response) =>{
        try{
            const { name, email, password, age, role } = req.body;
            const user = this.userBusiness.createUser( name, email, password, age, role );
            res.status(201).json(user);
        }catch(error: any){
            res.status(400).json({message: error.message});
        }
    }
    public getAllUsers = ( req: Request, res: Response)=>{
        try{
            const users = this.userBusiness.getAllUsers();
            res.status(200).json(users);
        }catch(error: any){
            res.status(500).json({ message: "Erro interno do servidor."});
        }
    }
    public getUserById = (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const user = this.userBusiness.getUserById(id);
            res.status(200).json(user);
        }
        catch (error: any) {
            res.status(404).json("Usuário não encontrado");
        }
    }
    public getUsersByAgeRange = (req: Request, res: Response) =>{
        try {
            const { min, max } = req.query;
            const users = this.userBusiness.getUsersByAgeRange(min, max);

            res.status(200).json(users);
        }catch (error: any){
            res.status(400).json({ message: error.message });
        }
    }
    public putUserById = (req:Request, res: Response) =>{
        try{
            const id = req.params.id;
            const{ name, email, role, age} = req.body;
            const updateUser = this.userBusiness.putUserById( id, name, email, role, age);
            res.status(200).json({ message: "Utilizador atualizado com sucesso!", user: updateUser });
        }catch (error: any){
            res.status(400).json({ message: error.message });
        }
    }
        
    public deleteUserById = (req: Request, res:Response) =>{
        try {
            const idToDelete = Number(req.params.id);
            const deleteUser = this.userBusiness.deleteUserById(idToDelete);
            res.status(200).json({ message: "Usuário deletado com sucesso.", user: deleteUser });

        } catch (error: any) {
            if (error.message.includes("encontrado")) {
                res.status(404).json({ message: error.message }); 
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }
    public cleanupInactiveUsers = (req: Request, res: Response) => {
        try {
            const { confirm } = req.query;
            const removedUsers = this.userBusiness.cleanupInactiveUsers(confirm);
            res.status(200).json({ message: "Limpeza de utilizadores inativos concluída.", removedUsers: removedUsers });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

