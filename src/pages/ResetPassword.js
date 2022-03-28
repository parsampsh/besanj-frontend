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
			code: (new URLSearchParams(window.location.search)).get('code'),
			codeIsValid: false,
			password: '',
			repeatPassword: '',
        }

		this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
		this.submitHandler = this.submitHandler.bind(this)
		this.repeatPasswordChangeHandler = this.repeatPasswordChangeHandler.bind(this)
		this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
		this.passwordSubmitHandler = this.passwordSubmitHandler.bind(this)
    }

	componentDidMount() {
		if (this.state.code != null) {
			Api.post('account/reset-password-final/', {code: this.state.code}).then(res => {
				if (res.status === 200) {
					this.setState({codeIsValid: true, isLoading: false, errors: ''})
				} else {
					this.setState({codeIsValid: false, isLoading: false, errors: 'Unexpected error: status code ' + res.status})
				}
			}).catch(error => {
				if (error.response === undefined) {
					this.setState({codeIsValid: false, isLoading: false, errors: String(error)})
				} else {
					if (error.response.status === 403) {
						this.setState({codeIsValid: false, isLoading: false, errors: 'This link is expired'})
					} else {
						this.setState({codeIsValid: false, isLoading: false, errors: 'Invalid link'})
					}
				}
			})
		}
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

	passwordChangeHandler(e) {
		this.setState({password: e.target.value})
	}

	repeatPasswordChangeHandler(e) {
		this.setState({repeatPassword: e.target.value})
	}

	passwordSubmitHandler(e) {
		e.preventDefault()

		this.setState({isLoading: true})

		if (this.state.password !== this.state.repeatPassword) {
			this.setState({isLoading: false, errors: 'Password repeat is invalid'})
		} else {
			const password = this.state.password

			Api.post('account/reset-password-final/', {code: this.state.code, new_password: password}).then(res => {
				if (res.status === 200) {
					this.setState({success: true, isLoading: false, errors: ''})
				} else {
					this.setState({success: false, isLoading: false, errors: 'Unexpected error: status code ' + res.status})
				}
			}).catch(error => {
				if (error.response === undefined) {
					this.setState({success: false, isLoading: false, errors: String(error)})
				} else {
					this.setState({success: false, isLoading: false, errors: 'Something went wrong'})
				}
			})
		}
	}

    render() {
		if (this.state.code != null) {
			if (this.state.isLoading && !this.state.codeIsValid) {
				return <div className='container'>
					{this.state.isLoading ? 'Loading...' : ''}
				</div>
			} else {
				if (this.state.codeIsValid) {
					if (this.state.success) {
						return <div className='alert alert-success'>Your password has been changed!</div>
					} else {
						return <div className='container'>
							{this.state.errors ? <div className='alert alert-danger'>{this.state.errors}</div> : ''}
							<form onSubmit={this.passwordSubmitHandler} className='form-group'>
								Password: <input required className='form-control' value={this.state.password} onChange={this.passwordChangeHandler} type='password' />
								<br />
								Repeat password: <input required className='form-control' value={this.state.repeatPassword} onChange={this.repeatPasswordChangeHandler} type='password' />
								<br />
								<input type='submit' value={this.state.isLoading ? 'Change the password...' : 'Change the password'} className='btn btn-success' />
							</form>
						</div>
					}
				} else {
					return <div className='container'>
						<div className='alert alert-danger'>{this.state.errors}</div>
					</div>
				}
			}
		}

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
