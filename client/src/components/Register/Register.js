import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login">
                        <h2 className="button__text">Register form</h2>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="text" className="login__input" placeholder="Email" />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="password" className="login__input" placeholder="Password" />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="password" className="login__input" placeholder="Repeat Password" />
                        </div>
                        <button className="button login__submit">
                            <span className="button__text">REGISTER</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>
                        <p className="link__redirect__register">If you already have an account <Link to="/auth/login">click here.</Link> </p>
                    </form>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    );
};

export default Register;