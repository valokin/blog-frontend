import styles from './BlogPostListItem.module.css';

const BlogPostListItem = ({ post, onClick }) => {
  return (
    <div onClick={() => {
      onClick()
    }}
      className={styles.container}
      data-testid="blog-post-list-item"
    >
      <div className={styles.title}
        data-testid="blog-post-list-item-title"
        >
        {post.title}
      </div>
      <div className={styles.description}
        data-testid="blog-post-list-item-description"
      >
        {post.description}
      </div>
      <div className={styles.commentCount}
        data-testid="blog-post-list-item-comment-count"
      >
        {`Number of comments: ${post.comments.length}`}
      </div>
    </div>
  )
};

export default BlogPostListItem;