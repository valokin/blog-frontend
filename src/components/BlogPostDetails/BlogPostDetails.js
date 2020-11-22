import styles from './BlogPostDetails.module.css';
import CommentList from '../CommentList/CommentList';
import NewCommentForm from '../NewCommentForm/NewCommentForm';

const BlogPostDetails = ({ post }) => {
    return (
        <div>
            {post && (
                <div>
                    <div
                        className={styles.container}
                    >
                        <h1 className={styles.title}>
                            {post.title}
                        </h1>
                        <div className={styles.description}>
                            {post.description}
                        </div>
                        <span className={styles.dateCreated}>
                            {`Created at: ${new Date(post.createdAt * 1000)}`}
                        </span>
                    </div>
                    <CommentList comments={post.comments} />
                    <NewCommentForm></NewCommentForm>
                </div>
            )}

        </div>
    )
};

export default BlogPostDetails;