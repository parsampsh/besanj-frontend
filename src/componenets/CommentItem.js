import React from 'react'
import CommentsList from './CommentsList'
import { Link } from 'react-router-dom'

class CommentItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let replies = ''
        if (this.props.comment.replies.length > 0) {
            replies = <div className='m-1 p-1 comment-item-replies'>
                Replies:

                <CommentsList comments={this.props.comment.replies} />
            </div>
        }
        return <div className='bg-dark text-light m-2 p-2 comment-item'>
            <div className='comment-item-user'><Link to={'/user-comments/' + this.props.comment.user.id + '/' + this.props.comment.user.username}>{this.props.comment.user.username}</Link>:</div>
            <div style={{clear: 'both'}}>{this.props.comment.text}</div>

            {replies}
        </div>
    }
}

export default CommentItem
