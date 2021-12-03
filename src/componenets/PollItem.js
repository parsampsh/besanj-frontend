import React from 'react'

class PollItem extends React.Component {
    render() { 
        const poll = this.props.poll
        return <div>
            {poll.title}
            <hr />
        </div>
    }
}
 
export default PollItem