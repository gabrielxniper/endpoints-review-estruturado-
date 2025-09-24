"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const UserData_1 = require("../data/UserData");
class UserBusiness {
    constructor() {
        this.getUserById = (id) => {
            const userData = new UserData_1.UserData();
            const idNumber = Number(id);
            if (isNaN(idNumber)) {
                throw new Error("ID inválido, deve ser um número.");
            }
            const user = userData.searchUserById(idNumber);
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            return user;
        };
        this.getUsersByAgeRange = (min, max) => {
            const userData = new UserData_1.UserData();
            if (!min || !max) {
                throw new Error("Parâmetros 'min' e 'max' são obrigatórios.");
            }
            const minAge = Number(min);
            const maxAge = Number(max);
            if (isNaN(minAge) || isNaN(maxAge)) {
                throw new Error("Parâmetros de idade devem ser números.");
            }
            return userData.searchUsersByAgeRange(minAge, maxAge);
        };
    }
}
exports.UserBusiness = UserBusiness;
;
