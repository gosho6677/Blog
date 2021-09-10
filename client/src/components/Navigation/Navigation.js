import { useContext } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import * as authService from '../../services/authService';
import "./Navigation.css";


const Navigation = () => {
    const user = useContext(AuthContext);
    const [, , removeCookie] = useCookies();

    const logoutHandler = async () => {
        removeCookie('token');
        const resp = await authService.logout();

        if(!resp.ok) {
            console.error(resp.error);
        }
    };

    const activeStyle = {
        backgroundColor: '#1c3e6b'
    };

    return (
        <nav className="nav">
            <NavLink className="logo" to={user ? '/dashboard' : '/'}>Software Blogging Website</NavLink>
            {user
                ? <ul className="nav-links">
                    <li><NavLink activeStyle={activeStyle} className="nav-item" to="/profile">Welcome, {user.username}!</NavLink></li>
                    <li><NavLink activeStyle={activeStyle} className="nav-item" to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink activeStyle={activeStyle} className="nav-item" to="/posts/create">Create Post</NavLink></li>
                    <li><button onClick={logoutHandler} className="logoutBtn" to="/">Logout</button></li>
                    {/* <li><NavLink activeStyle={activeStyle} className="nav-item" to="/auth/logout">Logout</NavLink></li> */}
                </ul>
                : <ul className="nav-links">
                    <li><NavLink activeStyle={activeStyle} className="nav-item" to="/auth/login">Login</NavLink></li>
                    <li><NavLink activeStyle={activeStyle} className="nav-item" to="/auth/register">Register</NavLink></li>
                </ul>}
        </nav>
    );
};

export default Navigation;