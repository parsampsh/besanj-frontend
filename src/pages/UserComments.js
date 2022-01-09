import React from 'react'
import { useParams } from 'react-router-dom'
import CommentsList from '../componenets/CommentsList'
import Api from '../Api'

class UserCommentsPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            comments: null,
            error: null,
        }
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search)
        const page = queryParams.get('page')

        Api.get('/comments/user_comments/?page=' + page + '&user_id=' + this.props.params.id).then(res => {
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
        let body = ''
        if (this.state.isLoading) {
            body = <div>
                <h2>Comments from {this.props.params.name}</h2>

                <div>Loading comments...</div>
            </div>
        } else if (this.state.error !== null) {
            body = <div className='alert alert-danger'>
                Faild to load comments: {this.state.error}
            </div>
        } else if (this.state.comments !== null) {
            const username = this.state.comments.comments !== undefined ? this.state.comments.comments[0].user.username : this.state.comments[0].user.username
            body = <div>
                <h2>Comments from {username}</h2>
                <CommentsList comments={this.state.comments} />
            </div>
        }

        return <div className='container'>
            {body}
        </div>
    }
}

function UserCommentsPageShell(props) {
    return <UserCommentsPage {...props} params={useParams()} />
}

export default UserCommentsPageShell
