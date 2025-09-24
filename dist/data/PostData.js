"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostData = void 0;
class PostData {
    constructor() {
        this.createPost = (newPost) => {
            posts.push(newPost);
        };
    }
}
exports.PostData = PostData;
