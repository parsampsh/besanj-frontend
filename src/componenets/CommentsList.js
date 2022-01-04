import React from 'react'
import Api from '../Api'
import CommentItem from '../componenets/CommentItem'

class CommentsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            comments: [],
            error: null,
        }
    }

    componentDidMount() {
        if (this.props.comments !== undefined) {
            this.setState({
                isLoading: false,
                comments: this.props.comments,
            })

            return
        }

        Api.get('/comments/poll_comments/?poll_id=' + this.props.poll.id).then(res => {
            this.setState({
                isLoading: false,
                comments: res.data.comments,
            })
        }).catch(error => {
            if (error.response === undefined) {
                this.setState({
                    isLoading: false,
                    error: String(error)
                })
            } else {
                this.setState({
                    isLoading: false,
                    error: error.response.data.error,
                })
            }
        })
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading comments...</div>
        }

        if (this.state.error !== null) {
            return <div className='alert alert-danger'>
                Faild to load comments: {this.state.error}
            </div>
        }

        return <div>
            {this.props.comments !== undefined ? '' : <h4>Comments</h4>}

            {this.state.comments.map((item, i) => {
                return <CommentItem comment={item} key={i} />
            })}
        </div>
    }
}

export default CommentsList
