import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as postService from '../../services/postService';
import ErrorBox from '../Notifications/ErrorBox';
import './Details.css';

const Details = ({ match }) => {
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
    }, [postId]);

    return (
        <div>
            {error && <ErrorBox error={error} setError={setError} />}
            <div className="post-details">
                <p><img className="post-img" src={post.imageUrl} alt="post url" /></p>
                <h2 className="post-title">Title: {post.title}</h2><hr />
                <p className="post-description"><strong>Description:</strong> <hr /> {post.description} adsjlasdjadskljdaksldaskldakjlsdljasldadsadjaslkdjalsjdklasjk dals dkasdkjl askdj asldjasl dkjaskldasdjadskljdaksldaskldakjlsdljasldadsadjaslkdjalsjdklasjk dals dkasdkjl askdj asldjasl dkjaskldasdjadskljdaksldaskldakjlsdljasldadsadjaslkdjalsjdklasjk dals dkasdkjl askdj asldjasl dkjaskldasdjadskljdaksldaskldakjlsdljasldadsadjaslkdjalsjdkdjasl dkjaskldasdjadskljdaksldaskldakjlsdljasldadsadjaslkdjalsjdklasjk dals dkasdkjl askdj asldjasl dkjaskld
                </p>
                <div className="detailsBtns">
                    <p className="fas fa-heart"> Likes: {post.likes} </p>
                    <button className="details-page-button green">Like</button>
                    <Link className="details-page-button">Edit</Link>
                    <button className="details-page-button red">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Details;