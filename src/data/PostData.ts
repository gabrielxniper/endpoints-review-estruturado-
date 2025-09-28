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
        const allPosts = posts;
        let highestId = 0;
        for(let i = 0; i< allPosts.length; i++){
            if (allPosts[i].id > highestId) {
                highestId = allPosts[i].id;
            }
        }
        return highestId + 1;
        
    }

    public deletePostById = (id: number) => {
        const postIndex = posts.findIndex(post => post.id === id);
        if (postIndex !== -1) {
            posts.splice(postIndex, 1);
        }
    }
}

