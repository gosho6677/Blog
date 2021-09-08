const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <p><i className="fas fa-user" /><em> User {comment.owner.username} commented:</em></p><hr />
            <p><i className="fas fa-comment" /> {comment.description}</p>
        </div>
    );
};

export default Comment;