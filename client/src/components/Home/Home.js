import Card from './Card';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as postService from '../../services/postService';
import './Home.css';
import ErrorBox from '../Notifications/ErrorBox';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        postService.getTopThree()
            .then(p => {
                if(!p.ok) {
                    throw new Error(p.error);
                }
                setPosts(p.posts);
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    return (
        <main className="home">
            {error && <ErrorBox error={error} setError={setError} />}
            <h1 className="heading">
                Welcome to our site where daily software news are shared.
            </h1>
            <hr />
            <p>
                If you want to read, like, comment posts or publish your own, please <Link to="/auth/register">click on this link and  register first</Link> or if you're already a member <Link to="/auth/login">please log in.</Link>
            </p>
            <p>
                Here's a glimpse of our top 3 most liked publications:
            </p>
            <div className="cards">
                {posts.length ? posts.map(p => <Card key={p._id} post={p}/>): <div>No posts available...</div>}
            </div>
        </main>
    );
};

export default Home;