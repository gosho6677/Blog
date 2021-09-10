import { useEffect, useState } from 'react';
import Card from '../shared/Card';
import Search from './Search';
import * as postService from '../../services/postService';
import { filterPosts } from '../../utils/filterPosts';
import './Dashboard.css';
import Pagination from './Pagination';

const Dashboard = ({ location }) => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [postsPerPage, setPostsPerPage] = useState(10);
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

    const postsPerPageHandler = e => {
        setPostsPerPage(Number(e.target.value));
    };

    const sortHandler = e => {
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
                <p className="sort-p">Posts per page: </p>
                <select onChange={postsPerPageHandler} className="perPage-select">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <p className="sort-p">Sort by: </p>
                <select onChange={sortHandler} className="sort-select">
                    <option value="oldest">Oldest</option>
                    <option value="recent">Recent</option>
                    <option value="asc">Likes asc.</option>
                    <option value="desc">Likes desc.</option>
                </select>
            </div>
            {filteredPosts.length
                ? <Pagination
                    Component={Card}
                    data={filteredPosts}
                    dataLimit={postsPerPage}
                    pageLimit={5}
                />
                : <h2>No posts available at the moment...</h2>
            }

        </section>
    );
};

export default Dashboard;