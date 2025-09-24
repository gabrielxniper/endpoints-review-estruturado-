import { users } from "../bd";

export class UserData{
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
    public deleteUsersByIds = (idsToDelete: number[]) => {
        for (let i = users.length - 1; i >= 0; i--) {
            const user = users[i];
            // Se o ID do utilizador atual estiver na lista para apagar...
            if (idsToDelete.includes(user.id)) {
                // ...nós o removemos da lista original.
                users.splice(i, 1);
            }
        }
    }
}