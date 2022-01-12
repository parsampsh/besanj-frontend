import React from 'react'
import Api from '../Api'

export default class SendCommentForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            isLoading: false,
            error: null,
            success: false,
        }

        this.textChangeHandler = this.textChangeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.deleteSuccessMessage = this.deleteSuccessMessage.bind(this)
    }

    textChangeHandler(event) {
        this.setState({text: event.target.value})
    }

    submitHandler(event) {
        event.preventDefault()

        this.setState({isLoading: true})

        Api.post('/comments/send/', {
            poll_id: this.props.pollId,
            text: this.state.text,
        }).then(res => {
            if (res.status === 201) {
                this.setState({isLoading: false, error: null, success: true})
                this.props.parentStateUpdator()
            } else {
                this.setState({isLoading: false, error: 'Unexpected error: ' + res.status, success: null})
            }
        }).catch(error => {
            if (error.response !== undefined) {
                this.setState({isLoading: false, error: 'Unexpected error: ' + error.response.status, success: null})
            } else {
                this.setState({isLoading: false, error: String(error), success: null})
            }
        })
    }

    deleteSuccessMessage() {
        this.setState({success: null})
    }

    render() {
        return <div className='container'>
            <form onSubmit={this.submitHandler}>
                {this.state.error !== null ? <div className='alert alert-danger'>{this.state.error}</div> : ''}
                {this.state.success ? <div className='alert alert-success'>Your comment has been sent successfully. <a href='#' onClick={this.deleteSuccessMessage}>Close</a></div> : ''}
                <textarea required maxLength='500' placeholder='Write your comment' onChange={this.textChangeHandler}>{this.state.text}</textarea>
                <input type='submit' value={this.state.isLoading ? 'Send...' : 'Send'} className='btn btn-primary' />
            </form>
        </div>
    }
}