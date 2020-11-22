import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from 'react'

import { DataContext } from '../App';
import BlogPostDetails from '../components/BlogPostDetails/BlogPostDetails'
import { getPostComments, getPosts } from '../services/posts';

const BlogPostPage = () => {
    const { id } = useParams();
    const { postsWithComments } = useContext(DataContext);
    const [pagePost, setPagePost] = useState(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initializePageData = async () => {
        // in case user went directly to the blog post detail page
        // ie not coming from the home page
        // we want to fetch the post data and it's comments
        if (postsWithComments.length === 0) {
            const posts = await getPosts();
            const thePost = posts.find(post => post.id === id);
            const comments = await getPostComments(id);
            setPagePost({
                ...thePost,
                comments,
            })
        }
        // otherwise if user comes from home page we already have
        // the post data with comments
        else {
            const thePost = postsWithComments.find(post => post.id === id);
            setPagePost(thePost);
        }
    }

    useEffect(initializePageData, [id, postsWithComments])

    return (
        <BlogPostDetails
            post={pagePost}
        />
    )
}

export default BlogPostPage;