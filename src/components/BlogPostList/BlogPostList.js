import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import BlogPostListItem from '../BlogPostListItem/BlogPostListItem';

const BlogPostList = ({ postsWithComments, fetchMoreComments }) => {

  const history = useHistory();
  return (
    <div>
      <h1>Blog</h1>
      <InfiniteScroll
        dataLength={postsWithComments.length}
        next={fetchMoreComments}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {postsWithComments.map((post) => {
          return (
            <BlogPostListItem
              onClick={() => {
                history.push(`/post/${post.id}`);
              }}
              post={post}
              key={post.id}>

            </BlogPostListItem>
          )
        })}
      </InfiniteScroll>
    </div>
  )
};

export default BlogPostList;
