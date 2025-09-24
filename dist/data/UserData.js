"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = void 0;
const bd_1 = require("../bd");
class UserData {
    constructor() {
        this.searchUserById = (id) => {
            return bd_1.users.find(user => user.id === id);
        };
        this.searchUsersByAgeRange = (min, max) => {
            return bd_1.users.filter(user => user.age >= min && user.age <= max);
        };
    }
}
exports.UserData = UserData;
