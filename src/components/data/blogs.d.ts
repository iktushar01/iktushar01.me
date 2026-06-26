export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    tags: string[];
    publishedAt: string;
    readingTime: number;
    featured: boolean;
    author: string;
}
export declare const blogPostsData: BlogPost[];
//# sourceMappingURL=blogs.d.ts.map