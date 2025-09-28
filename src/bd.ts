import { Post } from "../src/types/post";
import { User } from "../src/types/user";

export let users : User[] = [
        { id: 1, name: "Thiago", email: "flamengodecoracao@gmail.com", password: "flamengo123", age: 30, role: "admin" },
        { id: 2, name: "Gabriel Costa", email: "mgm@gmail.com", password: "paulaodasolda123", age: 22, role: "user" },
        { id: 3, name: "Maria Vitoria", email: "mary@gmail.com", password: "password", age: 19, role: "user" }
];

export let posts : Post[] = [];