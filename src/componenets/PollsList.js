import React from 'react'
import PollItem from './PollItem'

class PollsList extends React.Component {
    render() {
        return <div>
            {
                this.props.polls.polls.map((item, i) => <PollItem key={item.id} poll={item} />)
            }
        </div>
    }
}

export default PollsList
