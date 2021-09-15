import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import * as authService from '../../services/authService';
import "./Navigation.css";


const Navigation = () => {
    const user = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = async () => {
        await authService.logout();
        user.setUser({ isAuthenticated: false });
        history.push('/');
    };

    const activeStyle = {
        backgroundColor: '#1c3e6b'
    };

    return (
        <nav className="nav">
            {/* <NavLink
                className="logo"
                to={user.isAuthenticated ? '/dashboard?page=1&pageSize=10&sort=oldest' : '/'}
            >
                Software Blogging Website
            </NavLink> */}
            <NavLink
                className="logo"
                to={user.isAuthenticated ? '/dashboard?page=1&pageSize=10&sort=oldest' : '/'}
            >
                <img className="logo-img" src="/android-chrome-512x512.png" alt="logo" />
            </NavLink>
            {user.isAuthenticated
                ? <ul className="nav-links">
                    <li><NavLink activeStyle={activeStyle} className="nav-item" to="/profile">Welcome, {user.username}!</NavLink></li>
                    <li><NavLink activeStyle={activeStyle} className="nav-item" to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink activeStyle={activeStyle} className="nav-item" to="/posts/create">Create Post</NavLink></li>
                    <li><button onClick={logoutHandler} className="logoutBtn">Logout</button></li>
                </ul>
                : <ul className="nav-links">
                    <li><NavLink activeStyle={activeStyle} className="nav-item" to="/auth/login">Login</NavLink></li>
                    <li><NavLink activeStyle={activeStyle} className="nav-item" to="/auth/register">Register</NavLink></li>
                </ul>}
        </nav>
    );
};

export default Navigation;