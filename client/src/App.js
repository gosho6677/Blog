import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import { Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>  
        <Navigation />
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/auth/login' exact component={Login} />
            <Route path='/auth/register' exact component={Register} />
        </Switch>
        <Footer />
    </>
  );
}

export default App;
