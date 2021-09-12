import { setDate } from "../../utils/setDate";

const Comment = ({ comment, isOwner, userId }) => {
    return (
        <div className="comment">
            <p className="user-comment"><i className="fas fa-user" /><em> User {comment.owner.username} commented:</em></p>
            <p className="date-comment">
                Published at: {setDate(comment.iat)} 
                { (isOwner || userId === comment.owner._id) && 
                    <abbr title="Delete comment" className="delete-comment">
                        <i data-id={comment._id} className="far fa-trash-alt" />
                    </abbr>
                }
            </p>
            <hr />
            <p><i className="fas fa-comment" /> {comment.description}</p>
        </div>
    );
};

export default Comment;