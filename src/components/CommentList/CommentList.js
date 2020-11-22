import styles from './CommentList.module.css';

const CommentList = ({ comments }) => {
    return (
        <div className={styles.container}>
            {!!comments.length &&
                comments.map(comment => (
                    <div
                        className={styles.comment}
                        key={comment.id}
                    >
                        <div className={styles.text}>
                            {comment.text}
                        </div>
                        <div className={styles.name}>
                            {comment.name}
                        </div>
                        <div className={styles.dateCreated}>
                            {`${new Date(comment.createdAt * 1000)}`}
                        </div>
                    </div>))}
        </div>
    )
};

export default CommentList;