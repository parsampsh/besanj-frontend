import React from 'react'
import { useParams } from 'react-router-dom'
import IndexPage from './Index'
import PollsList from '../componenets/PollsList'

class UserPage extends IndexPage {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            polls: [],
            error: null
        }

        this.userId = props.params.id

        this.loadPolls = this.loadPolls.bind(this)
    }

    render() {
        let body = {}
        if (this.state.isLoading) {
            body = <div>
                Loading polls...
            </div>
        } else {
            if (this.state.error === null) {
                body = <PollsList polls={this.state.polls} />
            } else {
                body = <div className='alert alert-danger'>
                    {this.state.error}
                </div>
            }
        }
        return <div className='container'>
            <h2>Polls from {this.props.params.name}</h2>

            {body}
        </div>
    }
}

function UserPageShell(props) {
    return <UserPage {...props} params={useParams()} />
}

export default UserPageShell
