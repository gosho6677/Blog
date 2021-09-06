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

// TODO: 
/*
    [x]isAuthenticated, isGuest hoc guards
    [x]login, register requirements to make acc
    [x]fetch all posts service
    [x]create post page
    [x]create post services,
    details page,
    edit post page,
    edit post services,
    delete post,
    like post/adjust backend endpoint also,
    comment post/adjust backend endpoint also,
    get top 3 most liked posts query for home page,
    dashboard sort posts e.g. by likes, by comments, by date added,
    profile page
*/
function App() {
    const [user, setUser] = useState(null);
    const [cookies] = useCookies();

    useEffect(() => {
        if (cookies.token) {
            const { email, username, _id } = jwt_decode(cookies.token);
            setUser({ email, username, _id });
            postService.initializeToken(cookies.token);
        } else {
            setUser(null);
        }
    }, [cookies]);

    return (
        <>
            <AuthContext.Provider value={user}>
                <Navigation />
                <Switch>
                    <Route path='/' exact component={isAuth(Home)} />
                    <Route path='/dashboard' exact component={isGuest(Dashboard)} />
                    <Route path='/auth/login' exact component={isAuth(Login)} />
                    <Route path='/auth/register' exact component={isAuth(Register)} />
                    <Route path='/posts/create' exact component={Create} />
                    <Route path='/posts/:id' exact component={Details} />
                </Switch>
                <Footer />
            </AuthContext.Provider>
        </>
    );
}

export default App;
