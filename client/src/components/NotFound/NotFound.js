import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <h1>
            Something went wrong! Please <Link to="/">click here </Link> to go back to our home page.
        </h1>
    );
};

export default NotFound;