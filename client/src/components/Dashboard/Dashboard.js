import { useEffect, useState } from 'react';
import Card from '../Home/Card';
import Search from './Search';
import * as postService from '../../services/postService';
import { filterPosts } from '../../utils/filterPosts';
import './Dashboard.css';

const Dashboard = ({ location }) => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const filteredPosts = filterPosts(searchQuery, posts);

    useEffect(() => {
        postService.getAll()
            .then(res => {
                if (res.ok) {
                    setPosts(res.posts);
                }
            });

        return () => {
            setPosts([]);
        };
    }, []);

    const sortHandler = (e) => {
        switch (e.target.value) {
            case 'desc': {
                setPosts(oldPosts => {
                    return [...oldPosts.sort((a, b) => b.likes.length - a.likes.length)];
                });
                return;
            }
            case 'asc': {
                setPosts(oldPosts => {
                    return [...oldPosts.sort((a, b) => a.likes.length - b.likes.length)];
                });
                return;
            }
            case 'oldest': {
                setPosts(oldPosts => {
                    return [...oldPosts.sort((a, b) => a.unixTime - b.unixTime)];
                });
                return;
            }
            case 'recent': {
                setPosts(oldPosts => {
                    return [...oldPosts.sort((a, b) => b.unixTime - a.unixTime)];
                });
                return;
            }
            default:
                return console.log(e.target);
        }

    };

    return (
        <section>
            <div className="sort">
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <p className="sort-p">Sort by: </p>
                <select onChange={sortHandler} className="sort-select">
                    <option value="oldest">Oldest</option>
                    <option value="recent">Recent</option>
                    <option value="asc">Likes asc.</option>
                    <option value="desc">Likes desc.</option>
                </select>
            </div>
            <div className="wrapper">
                {filteredPosts.length 
                    ? filteredPosts.map(p => <Card key={p._id} post={p} />) 
                    : <div>No posts available at the moment...</div>
                }
            </div>

        </section>
    );
};

export default Dashboard;