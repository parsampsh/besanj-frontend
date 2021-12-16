import React from 'react'
import { Link } from 'react-router-dom'
import Api from '../Api'

class PollItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            error: null,
            poll: props.poll
        }

        this.chooseHandler = this.chooseHandler.bind(this)
    }

    chooseHandler(event) {
        const choiceId = event.target.value

        this.setState({isLoading: true})

        Api.post('polls/choose/', {
            'choice_id': choiceId
        }).then(res => {
            if (res.status === 200) {
                this.setState({isLoading: false, error: null, poll: res.data.updated_poll})
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
        const isAuth = localStorage.getItem('token') !== null
        const poll = this.state.poll
        console.log(isAuth)
        return <div>
            <h5>{poll.title}</h5>
            <p>{poll.description}</p>
            <span className='badge bg-primary'>Publish date: {poll.created_at}</span>
            {poll.is_published ? null : <span className='badge bg-danger'>Unpublished</span>}
            <div>Total votes: {poll.total_votes_count}</div>
            <div>Created by: <Link to={'/user/' + poll.user.id + '/' + poll.user.username}>{poll.user.username}</Link></div>
            <div>
                {this.state.error !== null ? <div className='alert alert-danger'>{this.state.error}</div> : ''}
                {this.state.isLoading ? 'Choosing...' : ''}
                {poll.choices.map((choice, i) => isAuth ? <div>
                    <input onChange={this.chooseHandler} type='radio' name={'poll' + poll.id} key={i} value={choice.id} /> {choice.title} | {choice.votes_percent}% ({choice.votes_count} votes)
                </div> : <div>
                    <input onChange={this.chooseHandler} disabled type='radio' name={'poll' + poll.id} key={i} value={choice.id} /> {choice.title} | {choice.votes_percent}% ({choice.votes_count} votes)
                </div>)}
            </div>
            <hr />
        </div>
    }
}

export default PollItem
