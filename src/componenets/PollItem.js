import React from 'react'
import { Link } from 'react-router-dom'

class PollItem extends React.Component {
    render() {
        const isAuth = localStorage.getItem('token') !== null
        const poll = this.props.poll
        console.log(isAuth)
        return <div>
            <h5>{poll.title}</h5>
            <p>{poll.description}</p>
            <span className='badge bg-primary'>Publish date: {poll.created_at}</span>
            {poll.is_published ? null : <span className='badge bg-danger'>Unpublished</span>}
            <div>Total votes: {poll.total_votes_count}</div>
            <div>Created by: <Link to={'/user/' + poll.user.id + '/' + poll.user.username}>{poll.user.username}</Link></div>
            <div>
                {poll.choices.map((choice, i) => isAuth ? <div>
                    <input type='radio' name={'poll' + poll.id} key={i} value={choice.id} /> {choice.title}
                </div> : <div>
                    <input disabled type='radio' name={'poll' + poll.id} key={i} value={choice.id} /> {choice.title}
                </div>)}
            </div>
            <hr />
        </div>
    }
}

export default PollItem
