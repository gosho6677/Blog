import { useState } from "react";
import { Link } from "react-router-dom";
import * as authService from "../../services/authService";
import ErrorBox from "../Notifications/ErrorBox";
import { useCookies } from "react-cookie";

const Register = ({ history }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePass, setRePass] = useState('');
    const [error, setError] = useState('');
    const [, setCookie] = useCookies();

    const registerHandler = async e => {
        e.preventDefault();

        try {
            if(password.length < 5) {
                throw new Error('Password must be atleast 5 characters long!');
            }
            if (password !== rePass) {
                throw new Error('Passwords must match!');
            }

            const response = await authService.register(email, username, password);

            if (!response.ok) {
                throw new Error(response.error);
            }

            setEmail('');
            setUsername('');
            setPassword('');
            setRePass('');

            setCookie('token', response.token, { path: '/' });

            history.push('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    {error && <ErrorBox error={error} setError={setError} />}
                    <form onSubmit={registerHandler} className="login">
                        <h2 className="button__text">Register form</h2>
                        <div className="login__field">
                            <i className="login__icon fas fa-envelope"></i>
                            <input
                                type="text"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="login__input"
                                placeholder="Email"
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="login__input"
                                placeholder="Username"
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="login__input"
                                placeholder="Password"
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input
                                type="password"
                                value={rePass}
                                onChange={e => setRePass(e.target.value)}
                                className="login__input"
                                placeholder="Repeat Password"
                            />
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