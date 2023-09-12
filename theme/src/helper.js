import {isBefore} from "date-fns";

export async function sortPosts(posts) {
    posts.sort((a, b) => {
        if (isBefore(a.publishDate, b.publishDate)) return 1;
        if (isBefore(b.publishDate, a.publishDate)) return -1;
        return 0;
    });
    return posts;
}