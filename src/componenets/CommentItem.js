import React from 'react'
import CommentsList from './CommentsList'
import SendCommentForm from './SendCommentForm'
import { Link } from 'react-router-dom'

class CommentItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            replyToggle: false,
            refreshCounter: 0,
        }

        this.replyHandler = this.replyHandler.bind(this);
        this.parentStateUpdator = this.parentStateUpdator.bind(this);
    }

    replyHandler(event) {
        this.setState({replyToggle: !this.state.replyToggle});
    }

    parentStateUpdator() {
        this.props.parentStateUpdator()

        this.setState({refreshCounter: this.state.refreshCounter+1});
    }

    render() {
        let replies = ''
        const isAuth = localStorage.getItem('token') !== null
        if (this.props.comment.replies.length > 0) {
            replies = <div className='m-1 p-1 comment-item-replies'>
                Replies:

                <CommentsList temp={this.state.refreshCounter} comments={this.props.comment.replies} />
            </div>
        }
        return <div className='bg-dark text-light m-2 p-2 comment-item'>
            <div className='comment-item-user'><Link to={'/user-comments/' + this.props.comment.user.id + '/' + this.props.comment.user.username}>{this.props.comment.user.username}</Link>:</div>
            <div style={{clear: 'both'}}>{this.props.comment.text}</div>
            {isAuth ? <button onClick={this.replyHandler} class='btn btn-primary'>{this.state.replyToggle ? 'Cancel' : 'Reply'}</button> : ''}
            {this.state.replyToggle ? <SendCommentForm parentStateUpdator={this.parentStateUpdator} commentId={this.props.comment.id} pollId={this.props.comment.poll_id} /> : ''}

            {replies}
        </div>
    }
}

export default CommentItem
