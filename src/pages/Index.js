import React from 'react'
import Api, { check_auth } from '../Api'
import PollsList from '../componenets/PollsList'
import { Navigate } from 'react-router-dom'

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            polls: [],
            error: null
        }

        this.loadPolls = this.loadPolls.bind(this)
    }

    componentDidMount() {
        if (this.requireAuth !== undefined && this.requireAuth === true) {
            check_auth(
                () => {
                    this.loadPolls()
                },
                () => {
                    this.setState({doRedirect: true})
                }
            )
        } else {
            this.loadPolls()
        }
    }

    loadPolls() {
        this.setState({isLoading: true})

        const queryParams = new URLSearchParams(window.location.search)
        const page = queryParams.get('page')
        const search = queryParams.get('search')

        let url = 'polls/?page=' + page
        if (this.baseUrl !== undefined) {
            url = this.baseUrl + '?page=' + page
        }

        if (search != null) {
            url = url + '&search=' + search
        }

        if (this.userId !== undefined) {
            url += '&user_id=' + this.userId
        }

        Api.get(url).then(res => {
            if (res.status === 200) {
                this.setState({polls: res.data, error: null, isLoading: false})
            } else {
                this.setState({error: 'Unexpected error: ' + res.status, isLoading: false})
            }
        }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === 404) {
                    this.setState({error: 'User not found', isLoading: false})
                } else {
                    this.setState({error: String(error), isLoading: false})
                }
            } else {
                this.setState({error: error.response.data.error, isLoading: false})
            }
        }).finally(() => {
            this.setState({isLoading: false})
        })
    }

    render() {
        if (this.state.doRedirect !== undefined && this.state.doRedirect) {
            return <Navigate to='/' />;
        }

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
            <h2>{this.mainTitle !== undefined ? this.mainTitle : 'Home'}</h2>
            <hr />

            {body}
        </div>
    }
}
