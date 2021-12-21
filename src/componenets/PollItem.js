import React from 'react'
import { Link } from 'react-router-dom'
import Api from '../Api'

class PollItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            error: null,
            poll: props.poll,
            removingVoteLoading: false,
            deletingPollLoading: false,
            isDeleted: false,
        }

        this.chooseHandler = this.chooseHandler.bind(this)
        this.voteRemoveHandler = this.voteRemoveHandler.bind(this)
        this.pollDeleteHandler = this.pollDeleteHandler.bind(this)
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
                if (error.response.status === 403) {
                    this.setState({isLoading: false, error: 'You cannot vote to this poll because it is not published yet'})
                } else {
                    this.setState({isLoading: false, error: 'Unexpected error: ' + error.response.status})
                }
            } else {
                this.setState({isLoading: false, error: String(error)})
            }
        })
    }

    voteRemoveHandler(event) {
        this.setState({removingVoteLoading: true})
        this.chooseHandler({target: {value: this.state.poll.selected_choice}})
        this.setState({removingVoteLoading: false})
    }

    pollDeleteHandler(event) {
        if (!window.confirm('Are you sure about deleting this poll?')) {
            return
        }

        this.setState({deletingPollLoading: true})

        Api.post('polls/delete/', {
            'poll_id': this.state.poll.id,
        }).then(res => {
            if (res.status === 200) {
                this.setState({deletingPollLoading: false, error: null, isDeleted: true})
            } else {
                this.setState({deletingPollLoading: false, error: 'Unexpected error: ' + res.status})
            }
        }).catch(error => {
            if (error.response !== undefined) {
                this.setState({deletingPollLoading: false, error: 'Unexpected error: ' + error.response.status})
            } else {
                this.setState({deletingPollLoading: false, error: String(error)})
            }
        })
    }

    render() {
        if (this.state.isDeleted) {
            return <div></div>
        }

        const isAuth = localStorage.getItem('token') !== null
        const poll = this.state.poll
        let showRemoveVoteBtn = false
        return <div>
            <h5>{this.props.noLink !== undefined ? poll.title : <Link to={'/poll/' + poll.id}>{poll.title}</Link>}</h5>
            <p>{poll.description}</p>
            <span className='badge bg-primary'>Publish date: {poll.created_at}</span>
            {poll.is_published ? null : <span className='badge bg-danger'>Unpublished</span>}
            <div>Total votes: {poll.total_votes_count}</div>
            <div>Created by: <Link to={'/user/' + poll.user.id + '/' + poll.user.username}>{poll.user.username}</Link></div>
            <div>
                {this.state.error !== null ? <div className='alert alert-danger'>{this.state.error}</div> : ''}
                {this.state.isLoading ? 'Choosing...' : ''}
                <div onChange={this.chooseHandler}>
                    {poll.choices.map((choice, i) => {
                        if (isAuth) {
                            if (poll.selected_choice !== undefined && poll.selected_choice === choice.id) {
                                showRemoveVoteBtn = true
                                return <div>
                                    <input defaultChecked type='radio' name={'poll' + poll.id} key={i} value={choice.id} /> {choice.title} | {choice.votes_percent}% ({choice.votes_count} votes)
                                </div>
                            } else {
                                return <div>
                                    <input type='radio' name={'poll' + poll.id} key={i} value={choice.id} /> {choice.title} | {choice.votes_percent}% ({choice.votes_count} votes)
                                </div>
                            }
                        } else {
                            return <div>
                                <input disabled type='radio' name={'poll' + poll.id} key={i} value={choice.id} /> {choice.title} | {choice.votes_percent}% ({choice.votes_count} votes)
                            </div>
                        }
                    })}
                </div>
                {showRemoveVoteBtn ? <button onClick={this.voteRemoveHandler} className='btn btn-warning'>Remove vote{this.state.removingVoteLoading ? '...' : ''}</button> : ''}
                {poll.belongs_to_you ? <button onClick={this.pollDeleteHandler} className='btn btn-danger m-1'>Delete the poll{this.state.deletingPollLoading ? '...' : ''}</button> : ''}
            </div>
            <hr />
        </div>
    }
}

export default PollItem
