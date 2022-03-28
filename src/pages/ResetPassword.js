import React from 'react'
import { Navigate } from 'react-router-dom'
import Api from '../Api'

export default class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
	    	username: '',
	    	isLoading: false,
	    	errors: '',
	    	success: false,
        }

		this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
		this.submitHandler = this.submitHandler.bind(this)
    }

    usernameChangeHandler(e) {
		this.setState({username: e.target.value})
    }

    submitHandler(e) {
		e.preventDefault()

		this.setState({isLoading: true})

		var data = {}

		if (this.state.username.includes('@')) {
		    data['email'] = this.state.username
		} else {
		    data['username'] = this.state.username
		}

		console.log(data)

		Api.post('account/reset-password/', data).then(res => {
		    if (res.status === 200) {
		        this.setState({success: true, isLoading: false, errors: ''})
		    } else {
		        this.setState({success: false, isLoading: false, errors: 'Unexpected error: status code ' + res.status})
		    }
		}).catch(error => {
		    if (error.response === undefined) {
		        this.setState({success: false, isLoading: false, errors: String(error)})
		    } else {
			console.log(error)
		        this.setState({success: false, isLoading: false, errors: 'Invalid username or email'})
		    }
		})
    }

    render() {
        return <div className='container'>
            <h2>Reset password</h2>

	    	{this.state.success ? <div className="alert alert-success">An link has been sent to your email address. Please check your inbox and open the link to reset your password</div> : ''}

	    	{this.state.errors ? <div className="alert alert-danger">{this.state.errors}</div> : ''}

            <form className='form-group' onSubmit={this.submitHandler}>
                Username or Email:
                <input required maxLength='255' value={this.state.username} type='text' onChange={this.usernameChangeHandler} className='form-control' placeholder='Enter your username or your email' />

				<br />

                <input type='submit' className='btn btn-success' value={this.state.isLoading ? 'Reset the password...' : 'Reset the password'} />
            </form>
        </div>
    }
}
