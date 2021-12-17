import React from 'react'
import { useParams } from 'react-router-dom'
import IndexPage from './Index'

class UserPage extends IndexPage {
    constructor(props) {
        super(props)

        this.userId = props.params.id
        this.mainTitle = 'Polls from ' + this.props.params.name
    }
}

function UserPageShell(props) {
    return <UserPage {...props} params={useParams()} />
}

export default UserPageShell
