import './Home.css';
import { Link } from 'react-router-dom';
import Card from './Card';

const Home = () => {
    return (
        <main classNameName="home">
            <h1 classNameName="heading">
                Welcome to our site where daily software news are shared.
            </h1>
            <hr />
            <p>
                If you want to read, like, comment posts or publish your own, please <Link to="/auth/register">click on this link and  register first</Link> or if you're already a member <Link to="/auth/login">please log in.</Link>
            </p>
            <p>
                Here's a glimpse of our top 3 most liked publications:
            </p>
            <div className="cards">
                <Card />
            </div>
        </main>
    );
};

export default Home;