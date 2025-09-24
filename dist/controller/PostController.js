"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const PostBusiness_1 = require("../business/PostBusiness");
class PostController {
    constructor() {
        this.postValidations = (req, res) => {
            const postBusiness = new PostBusiness_1.PostBusiness();
            try {
                const { title, content, authorId } = req.body;
                const newPost = postBusiness.postCreate(title, content, authorId);
                res.status(201).send({ message: "Post criado com sucesso!", post: newPost });
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        };
    }
}
exports.PostController = PostController;
