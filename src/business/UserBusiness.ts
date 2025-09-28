import { posts, users } from "../bd";
import { UserData } from "../data/UserData";


export class UserBusiness {
    private userData = new UserData();
    createUser = (name: string, email: string, password: string, age: number, role: string ) =>{
        const errors: string[] = [];

        if (!name || typeof name !== 'string' || name.length < 3) {
            errors.push("O campo 'name' é inválido.");
        }
        if (!email || !email.includes('@')) {
            errors.push("O campo 'email' é inválido.");
        }
        if (!password || typeof password !== 'string' || password.length < 6) {
            errors.push("O campo 'password' é inválido.");
        }

        if (errors.length > 0) {
            throw new Error(errors.join("\n"));
        }

        const emailAlreadyExists = this.userData.findUserByEmail(email);
        if (emailAlreadyExists) {
            throw new Error("Este e-mail já existe.");
        }
        const newUser = {
            id: this.userData.getNextId(),
            name,
            email,
            password,
            age,
            role
        };
        this.userData.insertUser(newUser);
    }
    public deleteUserById = (id: number) => {
        const userExists = this.userData.findUserById(id);
        if (!userExists) {
            throw new Error("Usuário não encontrado.");
        }
        this.userData.deleteUserById(id);
    }
    getAllUsers = () => {
        const users = this.userData.getAllUsers();
        return users;
    }
    getUserById = (id: any) => {
        const errors: string[] = [];
        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            errors.push("ID inválido, deve ser um número.");
        }
        const user = this.userData.searchUserById(idNumber);
        if (!user) {
            errors.push("Usuário não encontrado");
        }
        if (errors.length > 0) {
            throw new Error(errors.join("\n"));//join quebra os textos do "errors"
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
        const errors: string[] = [];

        if (isNaN(idNumber)){
            errors.push("ID deve ser um numero!")
        }
        if (typeof name !== 'string' || typeof email !== 'string' || typeof role !== 'string' || typeof age !== 'number') {
            errors.push("Tipos de dados inválidos. Verifique os campos enviados.");
        }
        const userToUpdate = this.userData.searchUserById(idNumber);
        if (!userToUpdate) {
            errors.push("Utilizador não encontrado");
        }
        const emailOwner = this.userData.searchUserByEmail(email.toLowerCase());
        if (emailOwner && emailOwner.id !== idNumber) {
            errors.push("E-mail já está em uso por outro utilizador."); 
        }
        if (errors.length > 0) {
            throw new Error(errors.join("\n"));//join quebra os textos do "errors"
        }
        const updatedUserData = { name, email: email.toLowerCase(), role, age };
        const updatedUser = this.userData.updateUserById(idNumber, updatedUserData);

        return updatedUser;
    }
    public cleanupInactiveUsers = (confirm: any) => {
        if (confirm !== 'true') {
            throw new Error("Parâmetro 'confirm=true' é obrigatório para executar a limpeza.");
        }
        const authorIds = posts.map(post => post.authorId);
        const allUsers = users; 
        const inactiveUsers = allUsers.filter(user => user.role !== 'admin' && !authorIds.includes(user.id));
        
        if (inactiveUsers.length > 0) {
            const idsToDelete = inactiveUsers.map(user => user.id);
            this.userData.deleteUsersByIds(idsToDelete);
        }
        return inactiveUsers;
    }
}
