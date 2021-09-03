import Navigation from './components/Navigation/Navigation';
import './App.css';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>  
        <div className="bg-image"></div>
        <Navigation />
        <Home />
        <Footer />
    </>
  );
}

export default App;
