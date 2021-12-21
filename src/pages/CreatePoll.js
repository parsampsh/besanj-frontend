import React from 'react'
import Api from '../Api'
import { Navigate } from 'react-router-dom'

class CreatePollPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            isLoading: false,
            done: false,
            error: null,
        }

        this.titleChangeHandler = this.titleChangeHandler.bind(this)
        this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    titleChangeHandler(event) {
        this.setState({title: event.target.value})
    }

    descriptionChangeHandler(event) {
        this.setState({description: event.target.value})
    }

    submitHandler(event) {
        event.preventDefault()

        this.setState({isLoading: true})

        Api.post('polls/create/', {
            title: this.state.title,
            description: this.state.description,
            choices: 'a', // TODO : handle choices
        }).then(res => {
            if (res.status === 201) {
                this.setState({isLoading: false, error: null, done: true})
            } else {
                this.setState({isLoading: false, error: 'Unexpected error: ' + res.status})
            }
        }).catch(error => {
            if (error.response !== undefined) {
                this.setState({isLoading: false, error: 'Unexpected error: ' + error.response.status})
            } else {
                this.setState({isLoading: false, error: String(error)})
            }
        })
    }

    render() {
        if (this.state.done) {
            return <Navigate to='/' />;
        }

        return <div className='container'>
            <h2>Create a new poll</h2>

            {this.state.error !== null ? <div className='alert alert-danger'>{this.state.error}</div> : ''}

            <form className='form-group' onSubmit={this.submitHandler}>
                Title:
                <input required maxLength={255} onChange={this.titleChangeHandler} type='text' value={this.state.title} className='form-control' placeholder='Title of the poll' />

                <br />

                Description:
                <textarea maxLength={1000} onChange={this.descriptionChangeHandler} style={{minHeight: 200}} className='form-control' placeholder='Description of the poll' value={this.state.description}></textarea>

                <br />

                <button type='submit' className='btn btn-primary'>Create{this.state.isLoading ? '...' : ''}</button>
            </form>
        </div>
    }
}

export default CreatePollPage
