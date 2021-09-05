import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import AuthContext from './contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

function App() {
    const [user, setUser] = useState(null);
    const [cookies] = useCookies();
    useEffect(() => {
        if (cookies.token) {
            const { email, username, _id } = jwt_decode(cookies.token);
            setUser({ email, username, _id });
        }
        return;
    }, [cookies]);

    return (
        <>
            <AuthContext.Provider value={user}>
                <Navigation />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/dashboard' exact component={Dashboard} />
                    <Route path='/auth/login' exact component={Login} />
                    <Route path='/auth/register' exact component={Register} />
                </Switch>
                <Footer />
            </AuthContext.Provider>
        </>
    );
}

export default App;
