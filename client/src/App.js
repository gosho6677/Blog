import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Create from './components/Create/Create';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import AuthContext from './contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

import isAuth from './guards/isAuth';
import isGuest from './guards/isGuest';

import * as postService from './services/postService';
import Details from './components/Details/Details';
import Edit from './components/Edit/Edit';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// TODO: 
/*
    [x] isAuthenticated, isGuest hoc guards
    [x] login, register requirements to make acc
    [x] fetch all posts service
    [x] create post page
    [x] create post services,
    [x] details page,
    [x] edit post page,
    [x] edit post services,
    [x] delete post,
    [x] like post/adjust backend endpoint also,
    [x] comment post/adjust backend endpoint also,
    [x] get top 3 most liked posts query for home page,
    [x] dashboard sort posts e.g. by likes
    [x] profile page
    [x] add issued at on post and comment models + controllers
    [x] switch to front end sorting for UX purposes
    [x] add sort by most recent and oldest
    [x] add search bar in dashboard
    [x] extract create and edit components form into one shared
    [x] add logout get request to add token to blacklist array
    [x] add pagination FE and posts per page select tag
    [x] exclude nested comment owner password and posts (populate trick)
    [x] add 404 not found page component
    [x] owners can delete all comments on their posts
    [x] comment creator can delete his comment on given post
    [x] add error boundary component
    [x] add persistence on page reload at queries in dashboard (sort by and items per page)
    [] add search to the query parameters
    [] adjust the code to some of the google lighthouse recommendations
*/

function App() {
    const [user, setUser] = useState({ isAuthenticated: false, initialLoad: true });
    const [cookies] = useCookies();

    useEffect(() => {
        if (cookies.token) {
            const { email, username, _id } = jwt_decode(cookies.token);
            setUser({ email, username, _id, setUser, isAuthenticated: true, initialLoad: false });
            postService.initializeToken(cookies.token);
        } else {
            setUser({ isAuthenticated: false });
        }
    }, [cookies.token]);

    return (
        <>
            <AuthContext.Provider value={user}>
                <Navigation />
                <ErrorBoundary>
                    <Switch>
                        <Route path='/' exact component={isAuth(Home)} />
                        <Route path='/dashboard' exact component={isGuest(Dashboard)} />
                        <Route path='/dashboard' component={isGuest(Dashboard)} />
                        <Route path='/auth/login' exact component={isAuth(Login)} />
                        <Route path='/auth/register' exact component={isAuth(Register)} />
                        <Route path='/posts/create' exact component={isGuest(Create)} />
                        <Route path='/posts/:id' exact component={Details} />
                        <Route path='/posts/edit/:id' exact component={isGuest(Edit)} />
                        <Route path='/profile' exact component={isGuest(Profile)} />
                        <Route path='*' component={NotFound} />
                    </Switch>
                </ErrorBoundary>
                <Footer />
            </AuthContext.Provider>
        </>
    );
}

export default App;
