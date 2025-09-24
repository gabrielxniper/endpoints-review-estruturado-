"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
class UserController {
    constructor() {
        this.userBusiness = new UserBusiness_1.UserBusiness();
        this.getUserById = (req, res) => {
            try {
                const id = Number(req.params.id);
                const user = this.userBusiness.getUserById(id);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(400).json("Usuário não encontrado");
            }
        };
        this.getUsersByAgeRange = (req, res) => {
            try {
                const { min, max } = req.query;
                const users = this.userBusiness.getUsersByAgeRange(min, max);
                res.status(200).json(users);
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        };
    }
}
exports.UserController = UserController;
