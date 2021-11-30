import React from 'react'
import Api, { check_auth } from '../Api'
import { Navigate } from 'react-router-dom'

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            passwordRepeat: '',
            isLoading: false,
            errors: [],
            done: false
        }

        this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
        this.emailChangeHandler = this.emailChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
        this.passwordRepeatChangeHandler = this.passwordRepeatChangeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    usernameChangeHandler(event) {
        this.setState({username: event.target.value})
    }

    emailChangeHandler(event) {
        this.setState({email: event.target.value})
    }

    passwordChangeHandler(event) {
        this.setState({password: event.target.value})
    }

    passwordRepeatChangeHandler(event) {
        this.setState({passwordRepeat: event.target.value})
    }

    submitHandler(event) {
        event.preventDefault()

        this.setState({isLoading: true})

        if (this.state.password !== this.state.passwordRepeat) {
            this.setState({isLoading: false, errors: ['Repeated password is not correct']})
        } else {
            Api.post('account/register/', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }).then(res => {
                if (res.status === 201) {
                    this.setState({isLoading: false, errors: []})
    
                    let token = res.data.api_token
                    window.localStorage.setItem('token', token)
    
                    this.setState({done: true})
                } else {
                    this.setState({isLoading: false, errors: ['Unexpected error: ' + res.status]})
                }
            }).catch(error => {
                if (error.response === undefined) {
                    this.setState({isLoading: false, errors: [String(error)]})
                } else if (error.response.status === 409) {
                    this.setState({isLoading: false, errors: [error.response.data.error]})
                } else {
                    this.setState({isLoading: false, errors: ['Unexpected error: ' + error.response.status]})
                }
            })
            this.setState({isLoading: false, errors: []})
        }
    }

    componentDidMount() {
        check_auth(
            () => {
                this.setState({done: true})
            },
            () => {}
        )
    }

    render() {
        if (this.state.done) {
            this.props.parentHandler(true)
            return <Navigate to='/' />;
        }

        var errors = <span></span>
        if (this.state.errors.length > 0) {
            errors = <div className='alert alert-danger'>
                <ul>
                    {
                        this.state.errors.map((item, i) => <li key={i}>{item}</li>)
                    }
                </ul>
            </div>
        }

        return <div className='container'>
            <h2>Register</h2>

            {errors}

            <form className='form-group' onSubmit={this.submitHandler}>
                Username:
                <input value={this.state.username} onChange={this.usernameChangeHandler} required maxLength='255' className='form-control' type='text' placeholder='Enter an username for your account' />

                <br />

                Email:
                <input value={this.state.email} onChange={this.emailChangeHandler} required maxLength='255' className='form-control' type='email' placeholder='Enter your email' />

                <br />

                Password:
                <input value={this.state.password} onChange={this.passwordChangeHandler} required className='form-control' type='password' placeholder='Create a password' />

                <br />

                Repeat Password:
                <input value={this.state.passwordRepeat} onChange={this.passwordRepeatChangeHandler} required className='form-control' type='password' placeholder='Repeat the password' />

                <br />

                <input type='submit' value={this.state.isLoading ? 'Register...' : 'Register'} className='btn btn-success' />
            </form>
        </div>
    }
}
