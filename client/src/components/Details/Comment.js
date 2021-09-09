import { setDate } from "../../utils/setDate";

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <p className="user-comment"><i className="fas fa-user" /><em> User {comment.owner.username} commented:</em></p>
            <p className="date-comment">Published at: {setDate(comment.iat)}</p>
            <hr />
            <p><i className="fas fa-comment" /> {comment.description}</p>
        </div>
    );
};

export default Comment;