import { Link } from "react-router-dom";

const Card = () => {
    return (
        <div className="card-wrapper">
            <div className="card">
                <div className="image-wrapper">
                    <Link className="image-link" to="#">
                        <img src='https://drscdn.500px.org/photo/92064849/m%3D900/v2?webp=true&sig=11d9fce5c5ec6d7b5ace21eff0cf8103b220658bc787b801dfe37ddc8e0b3d48' alt='' />
                    </Link>
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
                    <Link className="button" to="#">
                        Read More
                    </Link>
                    <p className="likes">Likes: 10</p>
                </div>
            </div>
        </div>
    );
};

export default Card;