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
            choices: [],
            newChoice: '',
        }

        this.titleChangeHandler = this.titleChangeHandler.bind(this)
        this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.newChoiceChangeHandler = this.newChoiceChangeHandler.bind(this)
        this.choiceAddHandler = this.choiceAddHandler.bind(this)
        this.deleteChoiceHandler = this.deleteChoiceHandler.bind(this)
        this.choiceChangeHandler = this.choiceChangeHandler.bind(this)
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

        let choicesAsStr = ''
        for (let i = 0; i < this.state.choices.length; i++) {
            choicesAsStr += this.state.choices[i] + '\n'
        }

        if (choicesAsStr === '') {
            this.setState({isLoading: false, error: 'You have not created any choice for this poll'})
            return
        }

        Api.post('polls/create/', {
            title: this.state.title,
            description: this.state.description,
            choices: choicesAsStr,
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

    newChoiceChangeHandler(event) {
        this.setState({newChoice: event.target.value})
    }

    choiceAddHandler(event) {
        let choices = this.state.choices
        choices.push(this.state.newChoice)

        this.setState({choices: choices, newChoice: ''})

        //document.getElementsByTagName('input')[1].focus() // TODO : use REF instead
    }

    deleteChoiceHandler(event) {
        let i = event.target.attributes.itemindex.value * 1
        let choices = this.state.choices
        let newChoices = []

        // TODO : use the correct way to pop an item fron array
        let x = 0
        while (x < choices.length) {
            if (x !== i) {
                newChoices.push(choices[x])
            }
            x++
        }

        this.setState({choices: newChoices})
    }

    choiceChangeHandler(event) {
        let i = event.target.attributes.itemindex.value * 1
        let choices = this.state.choices

        choices[i] = event.target.value
        this.setState({choices: choices})
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

                <div>
                    <h5>Choices</h5>
                    {
                        this.state.choices.map((item, i) => <div>
                            <input onChange={this.choiceChangeHandler} itemIndex={i} type='text' value={item} />
                            <button type='button' className='btn btn-danger' itemIndex={i} onClick={this.deleteChoiceHandler}>Delete</button>
                        </div>)
                    }
                    <input onChange={this.newChoiceChangeHandler} value={this.state.newChoice} type='text' placeholder='Add a choice...' />
                    <button type='button' onClick={this.choiceAddHandler} className='btn btn-primary'>+</button>
                </div>

                <br />

                <button type='submit' className='btn btn-primary'>Create{this.state.isLoading ? '...' : ''}</button>
            </form>
        </div>
    }
}

export default CreatePollPage
