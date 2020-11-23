import { useEffect, useContext } from 'react'
import BlogPostList from '../components/BlogPostList/BlogPostList'
import { DataContext } from '../App';

const BlogPage = () => {
    const { 
        fetchPostsData,
        postsWithComments,
        fetchMorePostsWithComments
    } = useContext(DataContext);

    useEffect(() => {
        fetchPostsData();
    }, []);

    return (
        <BlogPostList
            postsWithComments={postsWithComments}
            fetchMorePostsWithComments={fetchMorePostsWithComments}
        />
    )
}

export default BlogPage;