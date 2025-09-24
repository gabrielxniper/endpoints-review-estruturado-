export const users = [
    { id: 1, name: "Thiago", email: "flamengodecoracao@gmail.com", senha: "flamengo123", age: 30, role: "admin" },
    { id: 2, name: "Gabriel Costa", email: "mgm@gmail.com", senha: "paulaodasolda123", age: 22, role: "user" },
    { id: 3, name: "Maria Vitoria", email: "mavi@gmail.com", senha: "euaindaamominhaex", age: 19, role: "user" }
];
export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    published: boolean;
}
export let posts : Post[] = [];