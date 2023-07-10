import './App.css';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {
  return (
    <>
      <NavBar/>
      
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/registration' element={<Registration/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/logout' element={<Logout/>} />
      </Routes>
    </>
  );
}

export default App;
