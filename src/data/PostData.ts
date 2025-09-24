import { posts } from "../bd";
import { Post } from "../types/post"

export class PostData{
    public createPost = (newPost: Post) => {
        posts.push(newPost);
    }
    public updatePost = (id: number, dataToUpdate: any) => {
        const postIndex = posts.findIndex(post => post.id === id);

        if (postIndex !== -1) {
            posts[postIndex] = { ...posts[postIndex], ...dataToUpdate };
            return posts[postIndex];
        }
    }
    public searchPostById = (id: number): Post | undefined  =>{
        return posts.find(post => post.id === id);
    }
    public getNextId = (): number => {
        return posts.length + 1;
    }

    public deletePostById = (id: number) => {
        const postIndex = posts.findIndex(post => post.id === id);
        if (postIndex !== -1) {
            posts.splice(postIndex, 1);
        }
    }
}

