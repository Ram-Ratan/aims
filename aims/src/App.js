import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './layouts/navbar/Navbar';
import Header from './layouts/header/Header';
import About from './Pages/About';
import PersonalDetails from './Pages/PersonalDetails';
import Grade from './Pages/Grade';

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path='/about' Component={About} />
        <Route path='/personal-details' Component={PersonalDetails} />
        <Route path='/grade' Component={Grade} />
      </Routes>

    </Router>
    
  );
}

export default App;
