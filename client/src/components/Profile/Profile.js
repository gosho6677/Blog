import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { getCurrentUser } from '../../services/userService';
import Loading from '../Loading/Loading';
import Card from '../shared/Card';
import './Profile.css';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useContext(AuthContext);

    useEffect(() => {
        getCurrentUser(user?.username)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.error);
                }
                setLoading(false);
                setPosts(res.posts);
            })
            .catch(err => {
                console.error(err.message);
                setLoading(false);
            });

        return () => {
            setPosts([]);
        };
    }, [user?.username]);

    if(loading) {
        return <Loading />;
    }

    return (
        <section className="profile">
            <h2>Profile</h2>
            <div className="profile-info">
                <p><em>Name: </em>{user?.username}</p>
                <p><em>Email: </em>{user?.email}</p>
            </div>
            <h2>My posts</h2>
            <div className="my-posts">
                {posts.length ? posts.map(p => <Card key={p._id} post={p} />) : <div>You have no posts yet!</div>}

            </div>
        </section>
    );
};

export default Profile;