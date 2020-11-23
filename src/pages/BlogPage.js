import { useEffect, useContext } from 'react'
import BlogPostList from '../components/BlogPostList/BlogPostList'
import { DataContext } from '../App';

const BlogPage = () => {
    const { 
        fetchPostsData,
        postsWithComments,
        fetchMoreComments
    } = useContext(DataContext);

    useEffect(() => {
        fetchPostsData();
    }, []);

    return (
        <BlogPostList
            postsWithComments={postsWithComments}
            fetchMoreComments={fetchMoreComments}
        />
    )
}

export default BlogPage;