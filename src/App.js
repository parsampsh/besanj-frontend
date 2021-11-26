import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import IndexPage from './pages/Index'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'

function App() {
  return (
    <div className="App">
      <Router>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
        <Routes> 
          <Route exact path='/' element={<IndexPage />} />
          <Route exact path='/register' element={<RegisterPage />} />
          <Route exact path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
