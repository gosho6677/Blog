import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <main classNameName="home">
            <h1 classNameName="heading">
                Welcome to our site where daily software news are shared.
            </h1>
            <hr />
            <p>
                If you want to publish your own post, please <Link to="#">click on this link and  register first</Link> or if you're already a member <Link to="#">please log in.</Link>
            </p>
            <p>
                Here's a glimpse of our top 3 most liked publications:
            </p>
            <div className="cards">
                <div className="card-wrapper">
                    <div className="card">
                        <div className="image-wrapper">
                            <a className="image-link" href="#">
                                <img src='https://drscdn.500px.org/photo/92064849/m%3D900/v2?webp=true&sig=11d9fce5c5ec6d7b5ace21eff0cf8103b220658bc787b801dfe37ddc8e0b3d48' alt='Beautiful woman face by Oleg Gekman on 500px.com' />
                            </a>
                        </div>
                        <div className="text-box-wrapper">
                            <div className="text-box">
                                <h1 className="heading">
                                    Apple styles
                                </h1>
                                <p className="text">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, veritatis. . .
                                </p>
                            </div>
                        </div>

                        <div className="button-wrapper">
                            <a className="button" href="#">
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
                <div className="card-wrapper">
                    <div className="card">
                        <div className="image-wrapper">
                            <a className="image-link" href="#">
                                <img src='https://drscdn.500px.org/photo/92064849/m%3D900/v2?webp=true&sig=11d9fce5c5ec6d7b5ace21eff0cf8103b220658bc787b801dfe37ddc8e0b3d48' alt='' />
                            </a>
                        </div>
                        <div className="text-box-wrapper">
                            <div className="text-box">
                                <h1 className="heading">
                                    Apple styles
                                </h1>
                                <p className="text">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, veritatis...
                                </p>
                            </div>
                        </div>

                        <div className="button-wrapper">
                            <a className="button" href="#">
                                Read More
                            </a>
                            <p className="likes">Likes: 10</p>
                        </div>
                    </div>
                </div>
                <div className="card-wrapper">
                    <div className="card">
                        <div className="image-wrapper">
                            <a className="image-link" href="#">
                                <img src='https://drscdn.500px.org/photo/92064849/m%3D900/v2?webp=true&sig=11d9fce5c5ec6d7b5ace21eff0cf8103b220658bc787b801dfe37ddc8e0b3d48' alt='Beautiful woman face by Oleg Gekman on 500px.com' />
                            </a>
                        </div>
                        <div className="text-box-wrapper">
                            <div className="text-box">
                                <h1 className="heading">
                                    Apple styles
                                </h1>
                                <p className="text">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, veritatis. . .
                                </p>
                            </div>
                        </div>

                        <div className="button-wrapper">
                            <a className="button" href="#">
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;