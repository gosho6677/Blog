import { useEffect, useState, useCallback, useRef } from 'react';
import useQuery from '../../hooks/useQuery';

import Card from '../shared/Card';
import Search from './Search';
import Pagination from './Pagination';

import { filterPosts } from '../../utils/filterPosts';
import * as postService from '../../services/postService';
import './Dashboard.css';

const Dashboard = ({ location }) => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useQuery();
    const selectSortByRef = useRef();
    const selectPostsPerPageRef = useRef();
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

    useEffect(() => {
        setCurrentPage(query.page);
    }, [location.search, query.page]);

    const sortHandler = useCallback((e, val) => {
        const type = e?.target.value || val;
        switch (type) {
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
                return false;
        }

    }, []);

    useEffect(() => {
        /* 
            Adjusts page, posts per page and sort if user pastes URL with specific page and page size.
            Adjusts select tag with correct value on load if query is present
            Use detailed dependencies (not only query or only posts), because it causes infinite loops
            when used incorrectly.
        */
        if (query.page) {
            setCurrentPage(Number(query.page));
        }
        if (query.pageSize) {
            setPostsPerPage(Number(query.pageSize));
            selectPostsPerPageRef.current.value = query.pageSize;
        }
        if (posts.length && query.sort) {
            sortHandler(undefined, query.sort);
            selectSortByRef.current.value = query.sort;
        }

    }, [query.page, query.pageSize, query.sort, posts.length, sortHandler]);

    const postsPerPageHandler = e => {
        setPostsPerPage(Number(e.target.value));
    };

    return (
        <section>
            <div className="sort">
                <p className="posts-available">{filteredPosts.length} posts available.</p>
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <p className="sort-p">Posts per page: </p>
                <select
                    onChange={(e) => {
                        postsPerPageHandler(e);
                        setQuery({ pageSize: Number(e.target.value) });
                    }}
                    ref={selectPostsPerPageRef}
                    className="perPage-select"
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <p className="sort-p">Sort by: </p>
                <select
                    onChange={(e) => {
                        sortHandler(e);
                        setQuery({ sort: e.target.value });
                    }}
                    ref={selectSortByRef}
                    className="sort-select"
                >
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
                    query={query}
                    setQuery={setQuery}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                : <h2>No posts available at the moment...</h2>
            }

        </section>
    );
};

export default Dashboard;