import "./Navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {

    const activeStyle = {
        backgroundColor: '#1c3e6b'
    };

    return (
        <nav className="nav">
            <NavLink className="logo" to="/">Software Blogging Website</NavLink>
            <ul className="nav-links">
                <li><NavLink activeStyle={activeStyle} className="nav-item" to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink activeStyle={activeStyle} className="nav-item" to="/posts/create">Create Post</NavLink></li>
                <li><NavLink activeStyle={activeStyle} className="nav-item" to="/auth/logout">Logout</NavLink></li>
                <li><NavLink activeStyle={activeStyle} className="nav-item" to="/auth/login">Login</NavLink></li>
                <li><NavLink activeStyle={activeStyle} className="nav-item" to="/auth/register">Register</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navigation;