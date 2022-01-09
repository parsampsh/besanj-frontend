import React from 'react'
import CommentsList from './CommentsList'

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
            <div className='comment-item-user'>{this.props.comment.user.username}:</div>
            <div style={{clear: 'both'}}>{this.props.comment.text}</div>

            {replies}
        </div>
    }
}

export default CommentItem
