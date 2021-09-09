export const filterPosts = (query, posts) => {
    if(!query) {
        return posts;
    }

    return posts.filter(p => p.title.includes(query));
};