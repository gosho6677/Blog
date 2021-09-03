import "./Navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="nav">
            <NavLink className="logo" to="#">Software Blogging Website</NavLink>
            <ul className="nav-links">
                <li><NavLink className="nav-item" to="#">Create Post</NavLink></li>
                <li><NavLink className="nav-item" to="#">Logout</NavLink></li>
                <li><NavLink className="nav-item" to="#">Login</NavLink></li>
                <li><NavLink className="nav-item" to="#">Register</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navigation;