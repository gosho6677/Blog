import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';
import ErrorBox from '../Notifications/ErrorBox';
import './Login.css';

const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [, setCookie] = useCookies();
    
    const loginHandler = async e => {
        e.preventDefault();
        try {
            if(password.length < 5) {
                throw new Error('Password must be atleast 5 characters long!');
            }
            const response = await authService.login(email, password);

            if(!response.ok) {
                throw new Error(response.error);
            }

            setEmail('');
            setPassword('');
            setCookie('token', response.token, { path: '/' });
            history.push('/dashboard');
        } catch (err) {
            setError(err.message);
            console.error(err.message);
        }

        return () => {
            setEmail('');
            setPassword('');
            setError('');
        };
    };

    return (
        <div className="container">
            {error && <ErrorBox error={error} setError={setError} />}
            <div className="screen">
                <div className="screen__content">
                    <form onSubmit={loginHandler} className="login">
                        <h2 className="login__field">Login form</h2>
                        <div className="login__field">
                            <i className="login__icon fas fa-envelope"></i>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="login__input"
                                placeholder="Email"
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="login__input"
                                placeholder="Password"
                            />
                        </div>
                        <button className="login__submit">
                            <span className="button__text">LOGIN</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>
                        <p className="link__redirect">If you don't have an account please <Link to="/auth/register">click on this link.</Link> </p>
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

export default Login;