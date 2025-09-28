import { users } from "../bd";
import { User } from "../types/user";

export class UserData{
    public findUserByEmail = (email: String) =>{
        return users.find(user => user.email === email);
    }
    public findUserById = (id: number) => {
        const idUser = Number(id);
        const userFound = users.find(user => user.id === idUser);
        return userFound;
    }
    public insertUser = (newUser: User) => {
        users.push(newUser);
    }
    public getNextId = (): number =>{
        const allUsers = users;
        let highestId = 0;
        for(let i = 0; i< allUsers.length; i++){
            if (allUsers[i].id > highestId) {
                highestId = allUsers[i].id;
            }
        }
        return highestId + 1;
    }
    public searchUserById = (id:number) => {
        return users.find(user => user.id === id);
    }
    public searchUsersByAgeRange = (min:number, max:number) => {
        return users.filter(user => user.age >= min && user.age <= max);
    }
    public searchUserByEmail = (email:string) =>{
        return users.find(user=> user.email.toLowerCase() === email);
    }
    public updateUserById = (id: number, updatedUser: any) => {
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updatedUser };
            return users[userIndex];
        }
    }
    public getAllUsers = () =>{
        return users;
    }
    public deleteUserById = (id: number) => {
        const idAsNumber = Number(id);
        const userIndex = users.findIndex(user => user.id === idAsNumber);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
        }
    }
    public deleteUsersByIds = (idsToDelete: number[]) => {
        for (let i = users.length - 1; i >= 0; i--) {
            const user = users[i];
            if (idsToDelete.includes(user.id)) {
                users.splice(i, 1);//remove o item da posição i de users
            }
        }
    }
}