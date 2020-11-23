import { delay } from './utils';
import { RATE_LIMIT_COOLDOWN_DURATION, API_DOMAIN } from '../config';

export const getPosts = async () => {
    try {
        let res = await fetch(`${API_DOMAIN}/post`);
        while (res.status === 429) {
            await delay(RATE_LIMIT_COOLDOWN_DURATION);
            res = await fetch(`${API_DOMAIN}/post`);
        }
        return await res.json();
    }
    catch(e) {
        // report error to monitoring service
    }
}

export const getPostComments = async (postId) => {
    try {
        let res = await fetch(`${API_DOMAIN}/post/${postId}/comments`);
        while (res.status === 429) {
            await delay(RATE_LIMIT_COOLDOWN_DURATION);
            res = await fetch(`${API_DOMAIN}/post/${postId}/comments`);
        }
        return await res.json();;
    }
    catch(e) {
        // report error to monitoring service
    }
}

export const loadNextBatchOfComments = async (posts, postsWithComments, setPostsWithComments) => {

    const fetchNextBatch = async () => {
        const nextPostIndex = postsWithComments.length;
        const postsBatch = posts.slice(nextPostIndex, nextPostIndex + 3);
        const fetchCommentsPromises = postsBatch.map(async (post, index) => {
            return getPostComments(post.id);
        })
        const postComments = await Promise.all(
            fetchCommentsPromises
        )
        const newPostsWithComments = postsBatch.map((post, index) =>  ({
            ...post,
            comments: [
                ...postComments[index]
            ]
        }));
        setPostsWithComments([...postsWithComments, ...newPostsWithComments]);
    }
    fetchNextBatch();
}
