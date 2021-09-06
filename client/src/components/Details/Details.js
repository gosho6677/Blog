import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as postService from '../../services/postService';
import ErrorBox from '../Notifications/ErrorBox';
import './Details.css';

const Details = ({ match, history }) => {
    const [post, setPost] = useState({});
    const [error, setError] = useState('');
    const postId = match.params.id;

    useEffect(() => {
        postService.getById(postId)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.error);
                }
                setPost(res.post);
            })
            .catch(err => {
                setError(err.message);
            });

        return () => {
            setPost({});
        };
    }, [postId]);

    const deleteHandler = async e => {
        try {
            const resp = await postService.del(postId); 
            if(!resp.ok) {
                throw new Error(resp.error);
            }
            history.push('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            {error && <ErrorBox error={error} setError={setError} />}
            <div className="post-details">
                <p><img className="post-img" src={post.imageUrl} alt="post url" /></p>
                <h2 className="post-title">Title: {post.title}</h2><hr />
                <p className="post-description"><strong>Description:</strong> <hr /> {post.description}
                </p>
                <div className="detailsBtns">
                    <p className="fas fa-heart"> Likes: {post.likes} </p>
                    <button className="details-page-button green">Like</button>
                    <Link to={`/posts/edit/${postId}`} className="details-page-button">Edit</Link>
                    <button onClick={deleteHandler} className="details-page-button red">Delete</button>
                </div>
            </div>
            <h3>**Comments</h3> <hr />
            <div className="comments">
                <div className="comment">
                    <p><span className="fas fa-user"></span><em> User dsakjdals commented:</em></p>
                    <p>kjldaljkadsjkladksjadd</p>
                </div>
                <div className="comment">
                    <p><span className="fas fa-user"></span><em> User dsakjdals commented:</em></p>
                    <p>kjldaljkadsjkladksjadd</p>
                </div>
                <div className="comment">
                    <p><span className="fas fa-user"></span><em> User dsakjdals commented:</em></p>
                    <p>kjldaljkadsjkladksjadd</p>
                </div>
                <div className="comment">
                    <p><span className="fas fa-user"></span><em> User dsakjdals commented:</em></p>
                    <p>kjldaljkadsjkladksjadd</p>
                </div>
            </div>
        </div>
    );
};

export default Details;