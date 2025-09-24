
import { posts, users } from "../bd";
import { UserData } from "../data/UserData";


export class UserBusiness {
    private userData = new UserData();
    getUserById = (id: any) => {
        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            throw new Error("ID inválido, deve ser um número.");
        }
        const user = this.userData.searchUserById(idNumber);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return user;
    }
    getUsersByAgeRange = (min: any, max:any) => {
        if (!min || !max) {
            throw new Error("Parâmetros 'min' e 'max' são obrigatórios.");
        }
        const minAge = Number(min);
        const maxAge = Number(max);
        if (isNaN(minAge) || isNaN(maxAge)) {
            throw new Error("Parâmetros de idade devem ser números.");
        }
        return this.userData.searchUsersByAgeRange(minAge, maxAge);

    }
    putUserById = (id: any, name: string, email: string, role: string, age: number) =>{
        const idNumber = Number(id);
        if (isNaN(idNumber)){
            throw new Error ("ID deve ser um numero!")
        }
        if (typeof name !== 'string' || typeof email !== 'string' || typeof role !== 'string' || typeof age !== 'number') {
            throw new Error("Tipos de dados inválidos. Verifique os campos enviados.");
        }
        const userToUpdate = this.userData.searchUserById(idNumber);
        if (!userToUpdate) {
            throw new Error("Utilizador não encontrado");
        }
        const emailOwner = this.userData.searchUserByEmail(email.toLowerCase());
        if (emailOwner && emailOwner.id !== idNumber) {
            throw new Error("E-mail já está em uso por outro utilizador."); // Este erro resultará num 409
        }
        const updatedUserData = { name, email: email.toLowerCase(), role, age };
        const updatedUser = this.userData.updateUserById(idNumber, updatedUserData);

        return updatedUser;
    }
    public cleanupInactiveUsers = (confirm: any) => {
        if (confirm !== 'true') {
            throw new Error("Parâmetro 'confirm=true' é obrigatório para executar a limpeza.");
        }
        const authorIds = new Set(posts.map(post => post.authorId));
        const allUsers = users; // Simula a busca no DB
        const inactiveUsers = allUsers.filter(user => user.role !== 'admin' && !authorIds.has(user.id));
        
        if (inactiveUsers.length > 0) {
            const idsToDelete = inactiveUsers.map(user => user.id);
            this.userData.deleteUsersByIds(idsToDelete);
        }
        return inactiveUsers;
    }
}
