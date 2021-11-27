import React from 'react'

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

        this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    usernameChangeHandler(event) {
        this.setState({username: event.target.value})
    }

    passwordChangeHandler(event) {
        this.setState({password: event.target.value})
    }

    submitHandler(event) {
        event.preventDefault()

        // TODO : send request to the API
    }

    render() {
        return <div className='container'>
            <h2>Login</h2>

            <form className='form-group' onSubmit={this.submitHandler}>
                Username or Email:
                <input value={this.state.username} type='text' onChange={this.usernameChangeHandler} className='form-control' placeholder='Enter your username or your email' />

                <br />

                Password:
                <input value={this.state.password} type='password' onChange={this.passwordChangeHandler} className='form-control' placeholder='Enter your password' />

                <center>
                    <input type='submit' className='btn btn-success mt-2' value='Login' />
                </center>
            </form>
        </div>
    }
}
