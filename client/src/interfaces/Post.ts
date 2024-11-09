export interface Comment {
    body: string;
    username: string;
    createdAt: string;
}

export interface Like {
    username: string;
    createdAt: string;
}

export interface Post{
    content: string;
    imageUrl?: string; 
    author: String; 
    tags: String[]; 
    comments: Comment[];
    likes: Like[];
}

