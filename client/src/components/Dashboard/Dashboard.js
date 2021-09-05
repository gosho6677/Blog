import { useEffect, useState } from 'react';
import Card from '../Home/Card';
import * as postService from '../../services/postService';
import './Dashboard.css';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        postService.getAll()
            .then(res => {
                if(res.ok) {
                    setPosts(res.posts);
                }
            });
        
        return () => {
            setPosts([]);
        };
    }, []);
    return (
        <div className="wrapper">
            {posts.length ? posts.map(p => <Card key={p._id} post={p} />) : <div>No posts available at the moment...</div>}
        </div>
    );
};
 
export default Dashboard;