import React from 'react'
import { useParams } from 'react-router-dom'
import Api from '../Api'
import PollItem from '../componenets/PollItem'
import CommentsList from '../componenets/CommentsList'

class SinglePollPage extends React.Component {
    constructor(props) {
        super(props)

        this.pollId = props.params.id

        this.state = {
            isLoading: true,
            error: null,
            poll: null,
        }
    }

    componentDidMount() {
        Api.get('polls/?single_poll_id=' + this.pollId).then(res => {
            if (res.status === 200) {
                this.setState({isLoading: false, error: null, poll: res.data.polls[0]})
            } else {
                this.setState({isLoading: false, error: 'Unexpected error: ' + res.status})
            }
        }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === 404) {
                    this.setState({isLoading: false, error: 'Poll not found'})
                } else {
                    this.setState({isLoading: false, error: 'Unexpected error: ' + error.response.status})
                }
            } else {
                this.setState({isLoading: false, error: String(error)})
            }
        })
    }

    render() {
        let body = '';

        if (this.state.isLoading) {
            body = 'Loading...'
        } else {
            if (this.state.error !== null) {
                body = <div className='alert alert-danger'>{this.state.error}</div>
            } else {
                body = <div>
                    <PollItem poll={this.state.poll} noLink={true} />

                    <hr />

                    <CommentsList poll={this.state.poll} />
                </div>
            }
        }
        return <div className='container'>
            {body}
        </div>
    }
}

function SinglePollPageShell(props) {
    return <SinglePollPage {...props} params={useParams()} />
}

export default SinglePollPageShell
