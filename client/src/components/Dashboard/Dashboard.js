import { useEffect, useState } from 'react';
import Card from '../Home/Card';
import * as postService from '../../services/postService';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = ({ location }) => {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const query = location.search;
        postService.getAll(query)
            .then(res => {
                if (res.ok) {
                    setPosts(res.posts);
                }
            });

        return () => {
            setPosts([]);
        };
    }, [location.search]);

    return (
        <section>
            <ul className="sorts">
                <li><span>Sort by:</span></li>
                <li><Link to="/dashboard?sort=asc">Likes ascending</Link></li>
                <li><Link to="/dashboard?sort=desc">Likes descending</Link></li>
            </ul>
            <div className="wrapper">
                {posts.length ? posts.map(p => <Card key={p._id} post={p} />) : <div>No posts available at the moment...</div>}
            </div>

        </section>
    );
};

export default Dashboard;