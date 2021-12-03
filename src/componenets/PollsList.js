import React from 'react'
import PollItem from './PollItem'

class PollsList extends React.Component {
    render() {
        return <div>
            {
                this.props.polls.polls.map((item, i) => <PollItem key={i} poll={item} />)
            }
        </div>
    }
}
 
export default PollsList
