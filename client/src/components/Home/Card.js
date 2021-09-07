import { Link } from "react-router-dom";

const Card = ({ post }) => {

    return (
        <div className="card-wrapper">
            <div className="card">
                <div className="image-wrapper">
                    <Link className="image-link" to={`/posts/${post?._id}`}>
                        <img className="card-image" src={post?.imageUrl} alt='' />
                    </Link>
                </div>
                <div className="text-box-wrapper">
                    <div className="text-box">
                        <h1 className="heading">
                            {post?.title}
                        </h1>
                        <p className="text">
                            {post?.description.slice(0, 25)}...
                        </p>
                    </div>
                </div>

                <div className="button-wrapper">
                    <Link className="button" to={`/posts/${post?._id}`}>
                        Read More
                    </Link>
                    <p className="likes">Likes: {post?.likes}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;