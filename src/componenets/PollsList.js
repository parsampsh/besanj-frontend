import React from 'react'
import PollItem from './PollItem'

class PollsList extends React.Component {
    render() {
        let pagesButtons = []
        const currentPage = parseInt(this.props.polls.current_page)

        if (currentPage > 1) {
            pagesButtons.push(<a href={'?page=' + (currentPage-1)} key={-1} className='m-1 btn btn-primary'>Previous</a>)
        }

        for (let i = 0; i < parseInt(this.props.polls.pages_count); i++) {
            const isCurrentPage = (i+1) === parseInt(this.props.polls.current_page)
            pagesButtons.push(<a href={'?page=' + (i+1)} key={i} className={'m-1 btn btn-primary' + (isCurrentPage ? ' disabled' : '')}>{i+1}</a>)
        }

        if (currentPage < parseInt(this.props.polls.pages_count)) {
            pagesButtons.push(<a href={'?page=' + (currentPage+1)} key={parseInt(this.props.polls.pages_count)+1} className='m-1 btn btn-primary'>Next</a>)
        }

        return <div>
            {pagesButtons}
            <hr />

            {
                this.props.polls.polls.map((item, i) => <PollItem key={item.id} poll={item} />)
            }

            {pagesButtons}
        </div>
    }
}

export default PollsList
