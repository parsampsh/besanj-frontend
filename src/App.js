import React from 'react'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import IndexPage from './pages/Index'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import { check_auth } from './Api'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {isAuth: false}

    this.setIsAuth = this.setIsAuth.bind(this)
    this.logoutHandler = this.logoutHandler.bind(this)
  }

  setIsAuth(value) {
      this.setState({isAuth: value})
  }

  componentDidMount() {
    check_auth(
        () => {
            this.setIsAuth(true)
        },
        () => {}
    )
  }

  logoutHandler() {
    window.localStorage.removeItem('token')
    this.setIsAuth(false)
  }

  render() {
    let nav_links = null
    if (this.state.isAuth) {
      nav_links = <ul>
        <li><Link to='/'>Home</Link></li>
        <li><button onClick={this.logoutHandler} class='btn btn-danger'>Logout</button></li>
      </ul>
    } else {
      nav_links = <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
    }

    return (
      <div className="App">
        <Router>
          {nav_links}
          <Routes>
            <Route exact path='/' element={<IndexPage />} />
            <Route exact path='/register' element={<RegisterPage />} />
            <Route exact path='/login' element={<LoginPage parentHandler={this.setIsAuth} />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
