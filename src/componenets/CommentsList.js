import React from 'react'
import Api from '../Api'
import CommentItem from '../componenets/CommentItem'
import { generatePaginationButtons } from '../Pagination'

class CommentsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            comments: [],
            error: null,
        }

        this.loadComments = this.loadComments.bind(this)
    }

    componentDidMount() {
        this.loadComments()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.temp < this.props.temp) {
            this.loadComments()
        }
    }

    loadComments() {
        if (this.props.comments !== undefined) {
            let comments = this.props.comments
            if (comments.comments === undefined) {
                comments = {
                    comments: comments
                }
            }
            this.setState({
                isLoading: false,
                comments: comments,
            })

            return
        }

        Api.get('/comments/poll_comments/?poll_id=' + this.props.poll.id).then(res => {
            this.setState({
                isLoading: false,
                comments: res.data,
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

        let pagesButtons = ''
        if (this.state.comments.pages_count !== undefined) {
            pagesButtons = generatePaginationButtons(this.state.comments)
        }

        return <div>
            {this.props.comments !== undefined ? '' : <h4>Comments</h4>}

            {pagesButtons}

            {this.state.comments.comments.map((item, i) => {
                return <CommentItem comment={item} key={i} />
            })}

            {pagesButtons}
        </div>
    }
}

export default CommentsList
