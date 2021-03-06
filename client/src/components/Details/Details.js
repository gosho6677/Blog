import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as postService from '../../services/postService';
import ErrorBox from '../Notifications/ErrorBox';
import AuthContext from '../../contexts/AuthContext';
import Comment from './Comment';
import './Details.css';
import Loading from '../Loading/Loading';

const Details = ({ match, history }) => {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const user = useContext(AuthContext);
    const postId = match.params.id;

    useEffect(() => {
        postService.getById(postId)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.error);
                }
                setLoading(false);
                setPost(res.post);
                setIsOwner(res.post.owner._id === user?._id);
                setHasLiked(res.post.likes.includes(user?._id));
            })
            .catch(err => {
                setLoading(false);
                setError(err.message);
            });

        return () => {
            setPost({});
        };
    }, [postId, user]);

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const likeHandler = async e => {
        try {
            const resp = await postService.like(postId);
            if (!resp.ok) {
                throw new Error(resp.error);
            }
            setPost(oldPost => ({
                ...oldPost,
                likes: [...oldPost.likes, resp.userId]
            }));
            setHasLiked(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const dislikeHandler = async e => {
        try {
            const resp = await postService.dislike(postId);
            if (!resp.ok) {
                throw new Error(resp.error);
            }
            setPost(oldPost => ({
                ...oldPost,
                likes: oldPost.likes.filter(p => p !== resp.userId)
            }));
            setHasLiked(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const deletePostHandler = async e => {
        try {
            const resp = await postService.del(postId);
            if (!resp.ok) {
                throw new Error(resp.error);
            }
            history.push('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteCommentHandler = async e => {
        if (!e.target.tagName === 'I' || !e.target.classList.contains('fa-trash-alt')) {
            return;
        }

        try {
            const commentId = e.target.dataset.id;
            const res = await postService.deleteComment(post._id, commentId);

            if (!res.ok) {
                throw new Error(res.error);
            }
            setPost(oldPost => ({
                ...oldPost,
                comments: oldPost.comments.filter(c => c._id !== commentId)
            }));
        } catch (err) {
            setError(err.message);
        }
    };

    const commentHandler = async e => {
        e.preventDefault();

        try {
            let commentDescription = e.target.comment;

            if (!commentDescription.value) {
                throw new Error('Comment must be atleast 1 character long!');
            }

            const resp = await postService.comment(commentDescription.value, post?._id);
            if (!resp.ok) {
                throw new Error(resp.error);
            }
            setPost(oldPost => ({
                ...oldPost,
                comments: [...oldPost.comments, resp.comment]
            }));
            commentDescription.value = '';
        } catch (err) {
            setError(err.message);
        }
    };

    if(loading) {
        return <Loading />;
    }

    return (
        <div>
            {error && <ErrorBox error={error} setError={setError} />}
            <div className="post-details">
                <p><img className="post-img" src={post?.imageUrl} alt="post url" /></p>
                <h2 className="post-title">Title: {post?.title}</h2><hr />
                <p className="post-description">
                    <strong>Description:</strong> {post?.description}
                </p>
                <hr />
                <div className="detailsBtns">
                    <p className="fas fa-heart"> Likes: {post?.likes?.length} </p>
                    {isOwner ?
                        <>
                            <Link to={`/posts/edit/${postId}`} className="details-page-button">Edit</Link>
                            <button onClick={deletePostHandler} className="details-page-button red">Delete</button>
                        </>
                        : user.isAuthenticated && !hasLiked ?
                            <button onClick={likeHandler} className="details-page-button green">Like</button>
                            : user.isAuthenticated ? <button onClick={dislikeHandler} className="details-page-button red">Dislike</button> : ''}
                </div>
            </div>
            <h3>**Comments</h3> <hr />
            <div className="comments" onClick={deleteCommentHandler}>
                {post.comments?.length
                    ? post.comments.map(c => <Comment key={c._id} comment={c} isOwner={isOwner} userId={user._id} />)
                    : <div>No comments yet!</div>
                }
            </div>
            {user.isAuthenticated &&
                <form onSubmit={commentHandler} className="form-comment">
                    <h2>Comment:</h2>
                    <p>
                        <textarea
                            rows="12"
                            cols="50"
                            type="text"
                            className="form-textarea"
                            name="comment"
                        />
                    </p>
                    <input className="form-comment-btn" type="submit" value="Submit" />
                </form>
            }
        </div>
    );
};

export default Details;