import React from 'react'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import IndexPage from './pages/Index'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import Api, { check_auth } from './Api'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {isAuth: false, username: '', email: ''}

    this.setIsAuth = this.setIsAuth.bind(this)
    this.logoutHandler = this.logoutHandler.bind(this)
  }

  setIsAuth(value) {
      if (value === true) {
        console.log('B')
        Api.get('account/whoami/').then(res => {
          console.log('C')
          if (res.status === 200) {
            this.setState({
              isAuth: true,
              username: res.data.user.username,
              email: res.data.user.email
            })
          }
        }).catch(error => {})
      } else {
        this.setState({isAuth: value})
      }
  }

  componentDidMount() {
    check_auth(
        () => {
            console.log('A')
            this.setIsAuth(true)
        },
        () => {}
    )
  }

  logoutHandler() {
    if (window.confirm('Are you sure you want logout?')) {
      window.localStorage.removeItem('token')
      this.setIsAuth(false)
    }
  }

  render() {
    let nav_links = null
    if (this.state.isAuth) {
      nav_links = <ul>
        <div>Welcome {this.state.username} ({this.state.email})</div>
        <li><Link to='/'>Home</Link></li>
        <li><button onClick={this.logoutHandler} className='btn btn-danger'>Logout</button></li>
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
            <Route exact path='/register' element={<RegisterPage parentHandler={this.setIsAuth} />} />
            <Route exact path='/login' element={<LoginPage parentHandler={this.setIsAuth} />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
