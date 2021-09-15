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
